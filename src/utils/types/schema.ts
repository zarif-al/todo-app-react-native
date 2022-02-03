export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
}

export interface ICreateTodoInput {
  completed: Scalars['Boolean'];
  task: Scalars['String'];
}

export interface ICreateUserInput {
  email: Scalars['String'];
  fireId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}

export interface IDeleteTodoInput {
  id: Scalars['ID'];
}

export interface IMutation {
  __typename?: 'Mutation';
  createTodo: ITodo;
  createUser: IUser;
  deleteTodo: ITodo;
  updateTodo: ITodo;
}


export interface IMutationCreateTodoArgs {
  input: ICreateTodoInput;
}


export interface IMutationCreateUserArgs {
  input: ICreateUserInput;
}


export interface IMutationDeleteTodoArgs {
  input: IDeleteTodoInput;
}


export interface IMutationUpdateTodoArgs {
  input: IUpdateTodoInput;
}

export interface IQuery {
  __typename?: 'Query';
  currentUser?: Maybe<IUser>;
}

export interface ITodo {
  __typename?: 'Todo';
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  task: Scalars['String'];
  updatedAt: Scalars['DateTime'];
}

export interface IUpdateTodoInput {
  completed?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  task?: InputMaybe<Scalars['String']>;
}

export interface IUser {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  todos?: Maybe<Array<ITodo>>;
}
