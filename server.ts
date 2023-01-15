import { createServer } from 'http';
import {
  getUsers,
  getUser,
  /*createUser,
  updateUser,
  deleteUser*/
} from "./src/controllers/userController";

export const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  if (req.url === "/api/users" && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.method === 'GET') {
    //const id = req.url.split('/')[3];
    getUser(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.method === 'PUT') {

    //updateUser(req, res, id);
  } else if (req.method === 'DELETE') {

    // deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found',
      })
    );
  }
});
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on ${PORT}`))



