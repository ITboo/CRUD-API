import { IncomingMessage, ServerResponse } from "http";
import { CONTENT_TYPE } from "../constants/constants";

// 400 - Bad Request
export async function errParse(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(400, CONTENT_TYPE );
    res.end(JSON.stringify({ message: 'Error' }));
};

// 404 - Not Found
export async function notFound(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: 'Route is not found' }));
};

// 405 - Method Not Allowed
export async function errMethod(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(405, CONTENT_TYPE);
    res.end(JSON.stringify({ message: 'HTTP method is not supported' }));
};

// 500 - Internal Server Error
export async function errServer(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: 'Server error' }));
};