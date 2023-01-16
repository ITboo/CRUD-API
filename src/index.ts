import {createServer} from "http";
import { route } from "./router/router";
/*import cluster from "cluster";
import * as os from "os";*/

const port = process.env.PORT || 4000;

export const server = createServer(async (req, res) => {
  await route(req, res);
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
