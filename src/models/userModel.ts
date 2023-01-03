// Модель отвечает за данные, которые хранятся и обрабатываются на сервере.

import { IUser } from "../userInterface";
import testJSON from '../data/test.json'

let users = testJSON as IUser[];

export async function getUsers() {
    return users;
  }
export async function getUser() {
  }

export async function addUser() {
  }

export async function updateUser() {
  }

export async function deleteUser(){
  }