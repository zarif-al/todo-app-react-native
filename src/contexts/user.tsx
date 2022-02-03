import React, { createContext, useContext } from 'react';
import CreateTodo from 'src/api/mutation/create-todo.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import UpdateTodo from 'src/api/mutation/update-todo.mutation.graphql';
import DeleteTodo from 'src/api/mutation/delete-todo.mutation.graphql';
import {
  ICreateTodoInput,
  IUpdateTodoInput,
  IDeleteTodoInput,
} from 'src/utils/types/schema';
import { AuthContext } from 'src/contexts/auth';
import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
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

      let deepCopy = JSON.parse(JSON.stringify(existingUser.currentUser));

      deepCopy.todos = data.createTodo.todos;

      const updatedUser = deepCopy;

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

      const idToRemove = existingUser.currentUser.todos.filter(currentList =>
        data.deleteTodo.todos.some(newList => newList.id !== currentList.id),
      );

      const identity = cache.identify(existingUser.currentUser);

      cache.modify({
        id: identity,
        fields: {
          todos(existingCommentRefs, { readField }) {
            return existingCommentRefs.filter(
              commentRef => idToRemove[0].id !== readField('id', commentRef),
            );
          },
        },
      });
    },
    onError: () => {
      currentUserRefetch();
    },
    refetchQueries: [{ query: CurrentUser }],
  });

  const onCreateTodo = async (todo: ICreateTodoInput) => {
    const deepClone = cloneDeep(user.todos);
    deepClone.push({
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
          todos: deepClone,
        },
      },
    });
  };

  const onUpdateTodo = async (todoUpdate: IUpdateTodoInput) => {
    const deepClone = cloneDeep(user.todos);
    if (todoUpdate.task) {
      const todo = deepClone.find(todoItem => todoItem.id === todoUpdate.id);
      todo.task = todoUpdate.task;
    } else {
      const todo = deepClone.find(todoItem => todoItem.id === todoUpdate.id);
      todo.completed = todoUpdate.completed;
    }

    await updateTodo({
      variables: {
        input: todoUpdate,
      },
      optimisticResponse: {
        updateTodo: {
          todos: deepClone,
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
