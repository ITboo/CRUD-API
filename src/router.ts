import { IncomingMessage, ServerResponse } from 'http';
import {
  errMethod,
  errServer,
  notFound
} from './controllers/codeController';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "./controllers/userController";

export async function route(req: IncomingMessage, res: ServerResponse) {
  try {
    console.log(`SERVER ${req.method} ${req.url}`);

    if (req.url === '/api/users') {
      if (req.method === "GET") {
        await getUsers(req, res);
      } else if (req.method === "POST") {
        await createUser(req, res);
      } else {
        await errMethod(req, res) // 405
      }
    }

    else if (req.url.match(/^\/api\/users\/[\w-]+$/)) {
      const id = req.url.split("/")[3];
      if (req.method === "GET") {
        await getUser(req, res, id);
      } else if (req.method === "PUT") {
        await updateUser(req, res, id);
      } else if (req.method === "DELETE") {
        await deleteUser(req, res, id);
      } else {
        await errMethod(req, res); //405
      }
    } else {
      await notFound(req, res); //404
    }
  } catch (err) {
    await errServer(req, res); //500
  };
};