// Модель отвечает за данные, которые хранятся и обрабатываются на сервере.

import { IUser } from '../userInterface';
import userJSON from '../data/user.json';

let users = userJSON as IUser[];

// function a(): Promise<T> { return  }; где T – это некоторый параметр-тип T, который будет захвачен при вызове функции.

//to get all persons
export async function getUsers(): Promise<IUser[]> {
  return users;
};

//to get a person by id
export async function getUser(id: string): Promise<IUser> {
  return users.find((p) => p.id === id);
};

//to create record about new user and store it in database
export async function addUser(user: IUser): Promise<void> {
  users.push(user);
};

// to update existing user
export async function updateUser(id: string, user: IUser):Promise<void> {
  users.map((p, index) => {
    if (p.id === user.id) {
      users[index] = user;
    }
    return p;
  });
};

//to delete existing user from database
export async function deleteUser(id: string): Promise<void> {
  users = users.filter((p) => p.id !== id)
};