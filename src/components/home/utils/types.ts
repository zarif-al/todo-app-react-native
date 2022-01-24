import { Colors } from 'src/contexts/theme';
import { IUser } from 'src/utils/types/schema';

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
  array: TaskType[];
  setArray: (array: TaskType[]) => void;
}

export interface AddModalComponentTypes extends ModalComponentTypes {
  taskInput: string;
  setTaskInput: (taskInput: string) => void;
}

export interface EditModalComponentTypes extends ModalComponentTypes {
  taskInput: string;
  setTaskInput: (taskInput: string) => void;
  taskIndex: number | null;
}

export interface DeleteModalComponentTypes extends ModalComponentTypes {
  taskIndex: number | null;
}

export interface TaskListComponentTypes {
  array: TaskType[];
  setArray: (array: TaskType[]) => void;
  colors: Colors;
  setTaskIndex: (taskIndex: number) => void;
  setTaskInput: (taskInput: string) => void;
  setDeleteModalOpen: (deleteModalOpen: boolean) => void;
  setEditModalOpen: (editModalOpen: boolean) => void;
  setAddModalOpen: (addModalOpen: boolean) => void;
}

export interface AnimatedViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
