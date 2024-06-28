import http, { IncomingMessage, ServerResponse } from "http";
import { consoleColors } from "../utils/consoleColors";
import { ERRORS, START } from "../../common/messages";
import { getData, getEndpointController } from "../utils/request/request";
import { sendError } from "../utils/error";
import { RouteType } from "../../common/types/types";
import { usersRoutes } from "../utils/router/router";

export const createServer = () =>
  http.createServer((req: IncomingMessage, res: ServerResponse) =>
    requestListener(req, res)
  );

export const startMessage = (PORT: number) => {
  console.log(consoleColors.green, `${START}${PORT}`);
};

const routes: RouteType[] = [...usersRoutes];

export const requestListener = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const { method, pathname } = getData(req);
  const requestController = getEndpointController(pathname, method, routes);

  if (!requestController) {
    sendError(res, ERRORS.NO_ENDPOINT);
  } else {
    requestController(req, res);
  }
};
