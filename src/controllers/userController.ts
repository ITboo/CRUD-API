// Контроллер обрабатывает входящие запросы.

import * as User from '../models/userModel';
import { IncomingMessage, ServerResponse } from 'http';
import { v8 } from 'uuid';
import { errParse, notFound } from './codeController';

// GET api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const users = await User.getUsers()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))

};

// GET api/users/{userId}
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    const user = await User.getUser(id);
    if (v8.validate(id)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } else {
        await notFound(req, res); //404
    } else {
        await errParse(req, res); //400
    };
};

// POST api/users
export async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const body = 

    const { username, age, hobby } = JSON.parse(body)

    const user = {
        username,
        age,
        hobby
    }
    const id = uuid();
    const newUser = await User.addUser(user)
    
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newUser))
};

// PUT api/users/{userId}
export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string) {

};

// DELETE api/users/{userId}
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    if (!v8.validate(id)) {
        await errParse(req, res);
    } else if (await User.getUser(id)) {
        await User.deleteUser(id);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end();
    } else {
        await notFound(req, res); //404
    }
};
