/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  id: Scalars['ID'];
  listing: Listing;
  tenant: User;
};

export type Bookings = {
  __typename?: 'Bookings';
  result: Array<Booking>;
  total: Scalars['Int'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  bookings: Maybe<Bookings>;
  bookingsIndex: Scalars['String'];
  city: Scalars['String'];
  description: Scalars['String'];
  host: User;
  id: Scalars['ID'];
  image: Scalars['String'];
  numOfGuests: Scalars['Int'];
  price: Scalars['Int'];
  title: Scalars['String'];
  type: ListingType;
};


export type ListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type Listings = {
  __typename?: 'Listings';
  result: Array<Listing>;
  total: Scalars['Int'];
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationLogInArgs = {
  input: InputMaybe<LogInInput>;
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
  user: User;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  bookings: Maybe<Bookings>;
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  id: Scalars['ID'];
  income: Maybe<Scalars['Int']>;
  listings: Listings;
  name: Scalars['String'];
};


export type UserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  hasWallet: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['ID']>;
  token: Maybe<Scalars['String']>;
};

export type LogInMutationVariables = Exact<{
  input: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id: string | null, token: string | null, avatar: string | null, hasWallet: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id: string | null, token: string | null, avatar: string | null, hasWallet: boolean | null, didRequest: boolean } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, hasWallet: boolean, income: number | null } };


export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}},{"kind":"Field","name":{"kind":"Name","value":"didRequest"}}]}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}},{"kind":"Field","name":{"kind":"Name","value":"didRequest"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const AuthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authUrl"}}]}}]} as unknown as DocumentNode<AuthUrlQuery, AuthUrlQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}},{"kind":"Field","name":{"kind":"Name","value":"income"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;