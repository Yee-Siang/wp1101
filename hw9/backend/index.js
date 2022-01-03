import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './server.js';
import Mutation from './resolver/Mutation.js'
import ChatBox from './resolver/ChatBox.js'
import * as db from './models/message.js'
const pubsub = new PubSub();
mongo();
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
      Mutation,
      ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
