import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
/*import { IDialog, IUser } from './interface';*/

const port = process.env.PORT;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});