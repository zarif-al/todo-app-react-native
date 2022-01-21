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
  taskInput: string;
  setTaskInput: (taskInput: string) => void;
  array: TaskType[];
  setArray: (array: TaskType[]) => void;
}

export interface TaskListComponentTypes {
  array: TaskType[];
  setArray: (array: TaskType[]) => void;
  setVisible: (visible: boolean) => void;
  colors: Colors;
}
