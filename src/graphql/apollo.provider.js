import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  split,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_BASE_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:4000/subscription`,
    options: {
      reconnect: true,
      lazy: true,
    },
  })
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache: cache,
  link: splitLink,
});
