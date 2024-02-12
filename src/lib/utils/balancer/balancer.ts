import { createServer, request as httpRequest } from "http";
import { sendError } from "../error";
import { ERRORS } from "../../../common/messages";
import { consoleColors } from "../consoleColors";
import { getBody } from "../request/request";

export const balancer = (PORT: number, children: number) =>
  createServer(async (req, res) => {
    try {
      let count = 1;

      const body = await getBody(req);
      const { url, method } = req;

      const requestToChildParams = {
        headers: {
          "Content-Type": "application/json",
        },
        port: Number(PORT) + count,
        path: url,
        method: method,
      };

      const requestToChild = httpRequest(
        requestToChildParams,
        async (childResponse) => {
          const { statusCode } = childResponse;
          const childBody = await getBody(childResponse);

          res.writeHead(statusCode || 500, {
            "Content-Type": "application/json",
          });

          res.write(JSON.stringify(childBody || ""));
          res.end();
        }
      );

      requestToChild.on("error", (error) => {
        console.error(error);
      });

      requestToChild.write(JSON.stringify(body || ""));

      requestToChild.end();

      count = count + 1 > children ? 1 : count + 1;
    } catch (err) {
      sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
    }
  });

export const balancerMessage = (PORT: number) => {
  console.log(consoleColors.green, `Balancer is running on port: ${PORT}`);
};

export const startMessageChild = (PORT: number) => {
  console.log(consoleColors.gray, `Child server is running on port ${PORT}`);
};
