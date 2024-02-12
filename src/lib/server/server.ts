import http, { IncomingMessage, ServerResponse } from "http";
import { consoleColors } from "../utils/consoleColors";
import { START } from "../../common/messages";

export const createServer = () =>
  http.createServer((req: IncomingMessage, res: ServerResponse) =>
    requestListener(req, res)
  );

export const startMessage = (PORT: number) => {
  console.log(consoleColors.yellow, `${START} ${PORT}`);
};