import cluster from "cluster";
import * as os from "os";
import { server} from "./index";

const numCpu = os.cpus().length;
const port = process.env.PORT || 4000;

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
