import React, { createContext } from 'react';
import CreateTodo from 'src/api/mutation/create-todo.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import UpdateTodo from 'src/api/mutation/update-todo.mutation.graphql';
import DeleteTodo from 'src/api/mutation/delete-todo.mutation.graphql';
import {
  /* IUser */ ICreateTodoInput,
  IUpdateTodoInput,
  IDeleteTodoInput,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDeleteTodo: (todoDelete: IDeleteTodoInput) => {},
  /*   onGetUsers: () => {}, */
});

export default function UserContextProvider({ children }: Props): JSX.Element {
  const [createTodo] = useMutation(CreateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  });

  const [updateTodo] = useMutation(UpdateTodo, {
    refetchQueries: [{ query: CurrentUser }],
  });

  const [deleteTodo] = useMutation(DeleteTodo, {
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

  const onDeleteTodo = async (todoDelete: IDeleteTodoInput) => {
    await deleteTodo({
      variables: {
        input: todoDelete,
      },
    });
  };

  return (
    <UserContext.Provider
      value={{
        onCreateTodo,
        onUpdateTodo,
        onDeleteTodo,
      }}>
      {children}
    </UserContext.Provider>
  );
}
