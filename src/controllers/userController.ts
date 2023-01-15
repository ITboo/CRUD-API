// Контроллер обрабатывает входящие запросы.

//import users from '../models/userModel';
import { IncomingMessage, ServerResponse } from 'http';

//import {v8} from 'uuid';

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
    try {
        //const users = await users.getUsers()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        //res.end(JSON.stringify(users))

    } catch (error) {
        console.log(error)
    }

};
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {

};
export async function createUser(req: IncomingMessage, res: ServerResponse) {

};
export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string) {

};
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {

};