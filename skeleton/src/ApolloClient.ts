import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import { message as Message, Button } from "antd";
import urlJoin from 'url-join';

let apiHost = '/';

if(import.meta.env.DEV) {
  apiHost = '/';
} else {
  apiHost = import.meta.env.VITE_API_HOST as string?? '';
}

const apiBase = import.meta.env.VITE_API_BASE as string?? '';

const apolloCache = new InMemoryCache();
export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          Message.error(message, 5);
        });
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        Message.error(`[Network error111111]: ${networkError}`, 5);
      }
    }),
    new HttpLink({
      uri: urlJoin(apiHost, apiBase),
      credentials: "include",

    }),
  ]),
  cache: apolloCache,
  defaultOptions: {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
  }
});