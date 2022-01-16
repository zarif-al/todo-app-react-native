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
}

export interface ICreateUserInput {
  email: Scalars['String'];
  fireId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
}

export interface IMutation {
  __typename?: 'Mutation';
  createUser: IUser;
}


export interface IMutationCreateUserArgs {
  input: ICreateUserInput;
}

export interface IQuery {
  __typename?: 'Query';
  currentUser?: Maybe<IUser>;
  getUsers: Array<IUser>;
}

export interface IUser {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
}
