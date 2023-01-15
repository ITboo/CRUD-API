import dotenv from "dotenv";
import cluster from "cluster";

import { createServer } from 'http';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "./src/controllers/userController";



const PORT = process.env.PORT;
const server = createServer((req, res) => {
    if (req.method === 'GET') {
        getUsers(req, res);
    } else if (req.method === 'GET') {
       // getUser(req, res, id);
    } else if (req.method === 'POST') {
        createUser(req, res);
    } else if (req.method === 'PUT') {

        //updateUser(req, res, id);
    } else if (req.method === 'DELETE') {

       // deleteUser(req, res, id);
    } else {

    }
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))



