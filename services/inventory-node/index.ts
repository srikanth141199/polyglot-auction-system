import express from 'express';
import { createYoga } from 'graphql-yoga';
import { buildSubgraphSchema } from '@apollo/subgraph'; // Required for Federation
import { parse } from 'graphql';
import mongoose from 'mongoose';
import { Auction, type IAuction } from './models/Auction.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27018/inventory')
  .then(() => console.log('✅ Inventory DB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

const typeDefs = parse(`
  type Auction @key(fields: "id") {
    id: ID!
    title: String!
    description: String
    startingPrice: Float!
    endTime: String!
  }

  type Query {
    activeAuctions: [Auction]
    auction(id: ID!): Auction 
  }

  type Mutation {
    createAuction(title: String!, startingPrice: Float!, endTime: String!): Auction
  }
`);

const resolvers = {
  Auction: {
    // This allows the Go service to "find" this auction to attach bids
    __resolveReference: async (reference: { id: string }) => {
      return await Auction.findById(reference.id);
    }
  },
  Query: {
    activeAuctions: async (): Promise<IAuction[]> => {
      return await Auction.find();
    },
    auction: async (_: any, { id }: { id: string }): Promise<IAuction | null> => {
      return await Auction.findById(id);
    },
  },
  Mutation: {
    createAuction: async (_: any, { title, startingPrice, endTime }: any): Promise<IAuction> => {
      const auction = new Auction({ title, startingPrice, endTime });
      return await auction.save();
    },
  },
};

const yoga = createYoga({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

const app = express();
app.use('/graphql', yoga);

app.listen(5002, () => {
  console.log('🚀 Inventory Service (TS) ready at http://localhost:5002/graphql');
});