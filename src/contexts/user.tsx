import React, { createContext } from 'react';
import CreateTodo from 'src/api/mutation/create-todo.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import { /* IUser */ ICreateTodoInput } from 'src/utils/types/schema';
import { /* useQuery, ApolloError, */ useMutation } from '@apollo/client';

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreateTodo: (todo: ICreateTodoInput) => {},
  /*   onGetUsers: () => {}, */
});

export default function UserContextProvider({ children }: Props): JSX.Element {
  const [createTodo] = useMutation(CreateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  });

  /*  const [updateTodo] = useMutation(CreateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  }); */

  const onCreateTodo = async (todo: ICreateTodoInput) => {
    await createTodo({
      variables: {
        input: todo,
      },
    });
  };

  /*   const onUpdateTodo = async (todo: ICreateTodoInput) => {
    await updateTodo({
      variables: {
        input: todo,
      },
    });
  }; */

  return (
    <UserContext.Provider
      value={{
        onCreateTodo,
      }}>
      {children}
    </UserContext.Provider>
  );
}
