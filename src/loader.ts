import cluster from "cluster";
import * as os from "os";
import { server } from ".";
import { createServer } from "http";
import { route } from "./router/router";

const numCpu = os.cpus();


const main = (port: number): void => {
  console.log(
    `Main process is running on port ${port}. Waiting for workers...`
  );

  for (let i = 0; i < numCpu.length; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });

  /*cluster.on('message', (worker, msg) => {
    if (msg.action === 'send users') {

    }
    if (msg.action === 'get users') {
    
    }
  });*/
};

const worker = (port: number) => {
  const workerId = cluster.worker!.id;
  const workerPort = port + workerId;

  const startServer = (port: number) => {
    const server = createServer(async (req, res) => {
      await route(req, res);
    });
  };

  startServer(workerPort);
  console.log(`Worker ${workerId} running on port ${workerPort}.`);
};

export const startMulti = (port: number): void => {
  if (cluster.isPrimary) {
    main(port);
  } else {
    worker(port);
  }
};
