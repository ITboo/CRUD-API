import { createServer } from "http";
import dotenv from "dotenv";
import { route } from "./router/router";

const port = parseInt(process.env.PORT) || 4000;

dotenv.config();

export const server = createServer(async (req, res) => {
  await route(req, res);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}.`);
});

process.on("SIGINT", () => {
  console.log(`Process closed`);
  server.close(() => process.exit());
});
