import { Colors } from 'src/contexts/theme';
import {
  IUser,
  ITodo,
  ICreateTodoInput,
  IUpdateTodoInput,
  IDeleteTodoInput,
} from 'src/utils/types/schema';

export interface TaskType {
  name: string;
  completed: boolean;
}

export interface WelcomeScreenTypes {
  colors: Colors;
  user: IUser;
}

export interface ModalComponentTypes {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export interface AddModalComponentTypes extends ModalComponentTypes {
  taskInput: string;
  setTaskInput: (taskInput: string) => void;
  onCreateTodo: (todo: ICreateTodoInput) => void;
}

export interface EditModalComponentTypes extends ModalComponentTypes {
  taskInput: string;
  setTaskInput: (taskInput: string) => void;
  taskId: string | null;
  onUpdateTodo: (todoUpdate: IUpdateTodoInput) => void;
}

export interface DeleteModalComponentTypes extends ModalComponentTypes {
  taskId: string | null;
  onDeleteTodo: (todoDelete: IDeleteTodoInput) => void;
}

export interface TaskListComponentTypes {
  todos?: ITodo[] | null;
  onUpdateTodo: (todoUpdate: IUpdateTodoInput) => void;
  setAddModalOpen: (visible: boolean) => void;
  setEditModalOpen: (visible: boolean) => void;
  setDeleteModalOpen: (visible: boolean) => void;
  setTaskId: (taskId: string) => void;
  setTaskInput: (taskInput: string) => void;
  colors: Colors;
}

export interface AnimatedViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
