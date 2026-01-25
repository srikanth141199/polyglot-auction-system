import express from 'express';
import { createYoga, createSchema } from 'graphql-yoga';
import mongoose from 'mongoose';
import Auction, { type IAuction } from './models/Auction.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory')
  .then(() => console.log('✅ Inventory DB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Auction {
        id: ID!
        title: String!
        description: String
        startingPrice: Float!
        endTime: String!
      }
      type Query {
        activeAuctions: [Auction]
      }
      type Mutation {
        createAuction(title: String!, startingPrice: Float!, endTime: String!): Auction
      }
    `,
    resolvers: {
      Query: {
        activeAuctions: async (): Promise<IAuction[]> => {
          return await Auction.find();
        },
      },
      Mutation: {
        createAuction: async (_: any, { title, startingPrice, endTime }: any): Promise<IAuction> => {
          const auction = new Auction({ title, startingPrice, endTime });
          return await auction.save();
        },
      },
    },
  }),
});

const app = express();
app.use('/graphql', yoga);

app.listen(5002, () => {
  console.log('🚀 Inventory Service (TS) ready at http://localhost:5002/graphql');
});