import { createServer } from 'http';
import { consoleColors } from '../utils/consoleColors';
import { START } from '../../common/messages';
import DB from '../data/db';
import { getBody } from '../utils/request/request';

const sharedDB = new DB();

export const createDBServer = () =>
  createServer(async (req, res) => {
    const { method } = req;

    if (method === 'GET') {
      const users = sharedDB.getUsers();
      res.end(JSON.stringify(users));
      return;
    }

    if (method === 'POST') {
      const requestBody = await getBody(req);
      sharedDB.setUsers(requestBody);
      res.end();
      return;
    }

    res.end(null);
  });

export const startMessageDB = (PORT: number) => {
  console.log(consoleColors.yellow, `Database ${START}${PORT}` );
};