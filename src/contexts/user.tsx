import React, { createContext } from 'react';
import GetUsers from 'src/api/query/get-users.query.graphql';
import { IUser } from 'src/utils/types/schema';
import { useQuery, ApolloError } from '@apollo/client';

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({
  users: [] as IUser[],
  usersLoading: true,
  usersError: {} as ApolloError | undefined,
  /*   onGetUsers: () => {}, */
});

export default function UserContextProvider({ children }: Props): JSX.Element {
  const { data: users, loading: usersLoading, error: usersError } = useQuery(GetUsers);

  return (
    <UserContext.Provider
      value={{
        users: users?.getUsers,
        usersLoading,
        usersError,
      }}>
      {children}
    </UserContext.Provider>
  );
}
