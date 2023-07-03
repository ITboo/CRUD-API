import { createServer } from "http";
import cluster from "cluster";
import * as os from "os";
import dotenv from "dotenv";
import { route } from "./router/router";
import { loader } from "./loader";

const port = process.env.PORT || 4000;

dotenv.config();

const isMulti = process.argv.includes('--multi') ?? false;

export const server = createServer(async (req, res) => {
  await route(req, res);
});

if (isMulti) {
  loader()
  
} else {
  server.listen(port, () => {
    console.log(`Server running at port ${port}.`);
  });
}

process.on("SIGINT", () => {
  console.log(`Process closed`);
  server.close(() => process.exit());
});
