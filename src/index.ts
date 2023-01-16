import { createServer } from "http";
import { route } from "./router/router";
import cluster from "cluster";
import * as os from "os";

const port = process.env.PORT || 4000;

export const server = createServer(async (req, res) => {
  await route(req, res);
});

/*server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });*/


const numCpu = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running. Wait for workers...`);

  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died`);
  });

} else {
  server.listen(port, () => {
    console.log(` Worker ${process.pid} running at port http://localhost:${port}/`);
  });
};
