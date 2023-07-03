import cluster from "cluster";
import * as os from "os";
import { server } from ".";

const numCpu = os.cpus();
const port = process.env.PORT || 4000;

export const loader = () => {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running on ${port}`);

    let workers = numCpu.map(() => cluster.fork({ workerPort: port }));

    cluster.on("exit", (worker) => {
      console.log(`worker ${worker.process.pid} died`);
      workers = [
        ...workers.filter((el) => el.process.pid !== worker.process.pid),
        cluster.fork({ workerPort: port }),
      ];
    });
  } else {
    const workerPort = process.env.WORKER_PORT;
    server.listen(workerPort, () => {
      console.log(
        `Worker ${process.pid} started server on`,
        `${workerPort}`,
        "port"
      );
    });
  }
};
