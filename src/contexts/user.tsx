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

      let deepCopy = cloneDeep(existingUser.currentUser);

      deepCopy.todos.push(data.createTodo);

      const updatedUser = deepCopy;

      cache.writeQuery({
        query: CurrentUser,
        data: { currentUser: updatedUser },
      });
    },
    refetchQueries: [{ query: CurrentUser }],
  });

  const [updateTodo] = useMutation(UpdateTodo, {
    update: (cache, { data }) => {
      let existingUser = cache.readQuery({
        query: CurrentUser,
      });

      const deepCopy = cloneDeep(existingUser.currentUser);

      const index = deepCopy.todos.findIndex(
        todo => todo.id === data.updateTodo.id,
      );

      deepCopy.todos[index] = data.updateTodo;

      cache.writeQuery({
        query: CurrentUser,
        data: { currentUser: deepCopy },
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

      const taskId = data.deleteTodo.id;

      const identity = cache.identify(existingUser.currentUser);

      cache.modify({
        id: identity,
        fields: {
          todos(existingCommentRefs, { readField }) {
            return existingCommentRefs.filter(
              commentRef => taskId !== readField('id', commentRef),
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
    const optimisticObject = { ...todo };
    optimisticObject.id = 'randomString';

    await createTodo({
      variables: {
        input: todo,
      },
      optimisticResponse: {
        createTodo: optimisticObject,
      },
    });
  };

  const onUpdateTodo = async (todoUpdate: IUpdateTodoInput) => {
    const updatedItem = {
      ...user.todos.find(todo => todo.id === todoUpdate.id),
    };
    if (todoUpdate.task) {
      updatedItem.task = todoUpdate.task;
    } else {
      updatedItem.completed = todoUpdate.completed;
    }
    await updateTodo({
      variables: {
        input: todoUpdate,
      },
      optimisticResponse: {
        updateTodo: {
          ...updatedItem,
        },
      },
    });
  };

  const onDeleteTodo = async (todoDelete: IDeleteTodoInput) => {
    await deleteTodo({
      variables: {
        input: todoDelete,
      },
      optimisticResponse: {
        deleteTodo: {
          ...todoDelete,
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
