import dotenv from "dotenv";
import cluster from "cluster";

import {createServer} from 'http';
const PORT = process.env.PORT;
const server = createServer((req, res)=>{
    res.statusCode = 200;});

server.listen(PORT, ()=>console.log(`Server is running on ${PORT}`))



