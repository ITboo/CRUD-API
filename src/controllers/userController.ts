// Контроллер обрабатывает входящие запросы.

import User from '../models/userModel';
import { IncomingMessage, ServerResponse } from 'http';

//import {v8} from 'uuid';

// GET api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse) {
        const users = await User.getUsers()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))

};

// GET api/users/{userId}
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
    const user = await getUser(id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      
    };

};
/*
// POST api/users
export async function createUser(req: IncomingMessage, res: ServerResponse) {

};
export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string) {

};
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {

};
*/