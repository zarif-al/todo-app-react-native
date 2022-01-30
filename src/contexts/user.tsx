import React, { createContext, useContext } from 'react';
import CreateTodo from 'src/api/mutation/create-todo.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import UpdateTodo from 'src/api/mutation/update-todo.mutation.graphql';
import DeleteTodo from 'src/api/mutation/delete-todo.mutation.graphql';
import {
  /* IUser */ ICreateTodoInput,
  IUpdateTodoInput,
  IDeleteTodoInput,
} from 'src/utils/types/schema';
import { AuthContext } from 'src/contexts/auth';
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
  const { user, currentUserRefetch } = useContext(AuthContext);
  const [createTodo] = useMutation(CreateTodo, {
    update: (cache, { data }) => {
      let existingUser = cache.readQuery({
        query: CurrentUser,
      });

      existingUser.currentUser.todos = data.createTodo.todos;

      const updatedUser = existingUser.currentUser;

      cache.writeQuery({
        query: CurrentUser,
        data: { currentUser: updatedUser },
      });
    },
    onError: () => {
      //Reset state if error
      currentUserRefetch();
    },
    refetchQueries: [{ query: CurrentUser }],
  });

  const [updateTodo] = useMutation(UpdateTodo, {
    update: (cache, { data }) => {
      let existingUser = cache.readQuery({
        query: CurrentUser,
      });

      existingUser.currentUser.todos = data.updateTodo.todos;

      const updatedUser = existingUser.currentUser;

      cache.writeQuery({
        query: CurrentUser,
        data: { currentUser: updatedUser },
      });
    },
    onError: () => {
      //Reset state if error
      currentUserRefetch();
    },
    refetchQueries: [{ query: CurrentUser }],
  });

  const [deleteTodo] = useMutation(DeleteTodo, {
    update: (cache, { data }) => {
      let existingUser = cache.readQuery({
        query: CurrentUser,
      });

      existingUser.currentUser.todos = data.deleteTodo.todos;

      const updatedUser = existingUser.currentUser;

      cache.writeQuery({
        query: CurrentUser,
        data: { currentUser: updatedUser },
      });
    },
    onError: () => {
      //Reset state if error
      currentUserRefetch();
    },
    refetchQueries: [{ query: CurrentUser }],
  });

  const onCreateTodo = async (todo: ICreateTodoInput) => {
    let todos = user.todos;
    todos.push({
      id: 'randomString',
      task: todo.task,
      completed: false,
    });
    await createTodo({
      variables: {
        input: todo,
      },
      optimisticResponse: {
        createTodo: {
          todos: todos,
        },
      },
    });
  };

  const onUpdateTodo = async (todoUpdate: IUpdateTodoInput) => {
    const todos = user.todos;
    if (todoUpdate.task) {
      const todo = todos.find(todo => todo.id === todoUpdate.id);
      todo.task = todoUpdate.task;
    } else {
      const todo = todos.find(todo => todo.id === todoUpdate.id);
      todo.completed = todoUpdate.completed;
    }

    await updateTodo({
      variables: {
        input: todoUpdate,
      },
      optimisticResponse: {
        updateTodo: {
          todos: todos,
        },
      },
    });
  };

  const onDeleteTodo = async (todoDelete: IDeleteTodoInput) => {
    const todos = user.todos.filter(todo => todo.id !== todoDelete.id);
    await deleteTodo({
      variables: {
        input: todoDelete,
      },
      optimisticResponse: {
        deleteTodo: {
          todos: todos,
        },
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
