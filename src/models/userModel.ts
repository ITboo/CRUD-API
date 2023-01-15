// Модель отвечает за данные, которые хранятся и обрабатываются на сервере.

import { IUser } from '../userInterface';
import testJSON from '../data/test.json';
//import {v4} from 'uuid';

export const users = testJSON as IUser[];

//to get all persons
export async function getUsers() {
    return new Promise ((resolve) =>{
      resolve (users);
    });
  };

//to get aperson by id
export async function getUser(id) {
  };

//to create record about new user and store it in database
export async function addUser(user) {
  };

// to update existing user
export async function updateUser(id, user) {
  };

//to delete existing user from database
export async function deleteUser(id){
  };