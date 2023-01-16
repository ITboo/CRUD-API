// Контроллер обрабатывает входящие запросы.

import * as User from '../models/userModel';
import { IncomingMessage, ServerResponse } from 'http';
import { v8 } from 'uuid';
import { errParse, notFound } from './codeController';
import { getPostJSONData } from '../helper';
import { CONTENT_TYPE } from '../constants/constants';


// GET api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const users = await User.getUsers()

    res.writeHead(200, CONTENT_TYPE)
    res.end(JSON.stringify(users))

};

// GET api/users/{userId}
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    const user = await User.getUser(id);
    if (v8.validate(id)) {

        res.writeHead(200, CONTENT_TYPE);
        res.end(JSON.stringify(user));

    } else {
        await notFound(req, res); //404
    } else {
        await errParse(req, res); //400
    };
};

// POST api/users
export async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const body = await getPostJSONData(req);
    
    if (!body) {
        await errParse(req, res)
    } else {
        const id = uuid();
        const { username, age, hobbies } = body;

        await User.addUser({ id, username, age, hobbies });

        res.writeHead(201, CONTENT_TYPE);
        res.end(
            JSON.stringify({
                message: 'Operation successfully completed',
                user: { id, username, age, hobbies },
            })
        );
    }
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
        res.writeHead(204, CONTENT_TYPE);
        res.end();
    } else {
        await notFound(req, res); //404
    }
};
