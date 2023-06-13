
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignupInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface CreateLabelInput {
    name: string;
    color?: Nullable<string>;
}

export interface UpdateLabelInput {
    name?: Nullable<string>;
    color?: Nullable<string>;
}

export interface CreateTaskInput {
    name: string;
    description?: Nullable<string>;
    checkList?: Nullable<string[]>;
    startsAt: string;
    endsAt: string;
    isCompleted?: Nullable<boolean>;
    labels?: Nullable<string[]>;
}

export interface UpdateTaskInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    checkList?: Nullable<string[]>;
    startsAt?: Nullable<string>;
    endsAt?: Nullable<string>;
    isCompleted?: Nullable<boolean>;
    labels?: Nullable<string[]>;
}

export interface IQuery {
    __typename?: 'IQuery';
    me(): User | Promise<User>;
    userLabels(userId: string): Label[] | Promise<Label[]>;
    userTasks(userId: string, date?: Nullable<string>, search?: Nullable<string>): Task[] | Promise<Task[]>;
}

export interface IMutation {
    __typename?: 'IMutation';
    signup(payload: SignupInput): AuthResult | Promise<AuthResult>;
    signin(email: string, password: string): AuthResult | Promise<AuthResult>;
    refreshToken(): AccessToken | Promise<AccessToken>;
    signout(): Nullable<Void> | Promise<Nullable<Void>>;
    unregister(): Nullable<Void> | Promise<Nullable<Void>>;
    addLabel(payload?: Nullable<CreateLabelInput>): Label | Promise<Label>;
    updateLabel(id: string, payload?: Nullable<UpdateLabelInput>): Label | Promise<Label>;
    deleteLabel(id: string): Label | Promise<Label>;
    addTask(payload: CreateTaskInput): Task | Promise<Task>;
    updateTask(id: string, payload: UpdateTaskInput): Task | Promise<Task>;
    deleteTask(id: string): Task | Promise<Task>;
}

export interface AuthResult {
    __typename?: 'AuthResult';
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface AccessToken {
    __typename?: 'AccessToken';
    accessToken: string;
}

export interface Label {
    __typename?: 'Label';
    _id: string;
    name: string;
    color: string;
    user: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Task {
    __typename?: 'Task';
    _id: string;
    name: string;
    description?: Nullable<string>;
    checkList: string[];
    startsAt: DateTime;
    endsAt: DateTime;
    isCompleted: boolean;
    labels: Label[];
    user: User;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface User {
    __typename?: 'User';
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    labels: Label[];
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type Void = any;
export type DateTime = any;
type Nullable<T> = T | null;
