// Контроллер обрабатывает входящие запросы.

import * as User from '../models/userModel';
import { IncomingMessage, ServerResponse } from 'http';
import { validate, v4 as uuid } from 'uuid';
import { errParse, notFound } from './codeController';
import { getPostJSONData } from '../helper';
import { CONTENT_TYPE } from '../constants/constants';
import {Response} from '../constants/response'

// GET api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const users = await User.getUsers()

    res.writeHead(200, CONTENT_TYPE)
    res.end(JSON.stringify(users))

};

// GET api/users/{userId}
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {

    if (validate(id)) {
        const user = await User.getUser(id);
        if (user) {
            res.writeHead(200, CONTENT_TYPE);
            res.end(JSON.stringify(user));

        } else {
            await notFound(req, res); //404
        }
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
                message: Response.SUCCESS ,
                user: { id, username, age, hobbies },
            })
        );
    }
};

// PUT api/users/{userId}
export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {

    const body = await getPostJSONData(req);

    if (!body) {
        await errParse(req, res);
    } else if ((body) && validate(id)) {
        if (await User.getUser(id)) {

            const { username, age, hobbies } = body;
            await User.updateUser({ id, username, age, hobbies });
            res.writeHead(200, CONTENT_TYPE);
            res.end(
                JSON.stringify({
                    message: Response.SUCCESS,
                    user: { id, username, age, hobbies },
                })
            );
        } else {
            await notFound(req, res); //404
        }
    }
};

// DELETE api/users/{userId}
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    if (!validate(id)) {
        await errParse(req, res);
    } else if (await User.getUser(id)) {
        await User.deleteUser(id);
        res.writeHead(204, CONTENT_TYPE);
        res.end();
    } else {
        await notFound(req, res); //404
    }
}
