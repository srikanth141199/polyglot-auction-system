import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'inventory', url: 'http://localhost:5002/graphql' },
      { name: 'bidding', url: 'http://localhost:8080/query' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Gateway ready at ${url}`);
};

startServer();