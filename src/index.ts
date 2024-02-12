import { PORT } from "./common/constants";
import { createServer, startMessage } from "./lib/server/server";

createServer().listen(PORT, () => startMessage(PORT))