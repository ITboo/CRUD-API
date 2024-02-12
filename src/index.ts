import { cpus } from "os";
import { DB_PORT, PORT } from "./common/constants";
import { createDBServer, startMessageDB } from "./lib/server/db_server";
import { createServer, startMessage } from "./lib/server/server";

import cluster from "cluster";
import { consoleColors } from "./lib/utils/consoleColors";
import { balancer, balancerMessage, startMessageChild } from "./lib/utils/balancer/balancer";
const MULTI = process.env.MULTI === "multi";
const CPUS = cpus().length - 1;

if (!MULTI) {
  createDBServer().listen(DB_PORT, () => startMessageDB(DB_PORT));
  createServer().listen(PORT, () => startMessage(PORT));
} else {
  if (cluster.isPrimary) {
    createDBServer().listen(DB_PORT, () => startMessageDB(DB_PORT));
    new Array(CPUS)
      .fill(0)
      .map((_, i) => i)
      .forEach((i) => {
        cluster.fork({ CHILD_PORT: PORT + 1 + i });
      });

    cluster.on("exit", (server) => {
      console.log( consoleColors.cyan, `Child server ${server.id} is finished`);
    });

    balancer(PORT, CPUS).listen(PORT, () => balancerMessage(PORT));
  }

  if (cluster.isWorker) {
    const childPort = Number(process.env.CHILD_PORT);
    createServer().listen(childPort, () => startMessageChild(childPort));
  }
}

