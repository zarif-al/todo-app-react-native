import React, { createContext } from 'react';
import CreateTodo from 'src/api/mutation/create-todo.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import UpdateTodo from 'src/api/mutation/update-todo.mutation.graphql';
import {
  /* IUser */ ICreateTodoInput,
  IUpdateTodoInput,
} from 'src/utils/types/schema';
import { /* useQuery, ApolloError, */ useMutation } from '@apollo/client';

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreateTodo: (todo: ICreateTodoInput) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdateTodo: (todoUpdate: IUpdateTodoInput) => {},
  /*   onGetUsers: () => {}, */
});

export default function UserContextProvider({ children }: Props): JSX.Element {
  const [createTodo] = useMutation(CreateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  });

  const [updateTodo] = useMutation(UpdateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  });

  const onCreateTodo = async (todo: ICreateTodoInput) => {
    await createTodo({
      variables: {
        input: todo,
      },
    });
  };

  const onUpdateTodo = async (todoUpdate: ICreateTodoInput) => {
    await updateTodo({
      variables: {
        input: todoUpdate,
      },
    });
  };

  return (
    <UserContext.Provider
      value={{
        onCreateTodo,
        onUpdateTodo,
      }}>
      {children}
    </UserContext.Provider>
  );
}
