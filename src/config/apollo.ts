import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import auth from '@react-native-firebase/auth';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URI = 'https://zarif-todo-app-api.herokuapp.com/graphql';

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  const token = await auth().currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
