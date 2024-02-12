import { ServerResponse } from "http";

export const sendError = (
    res: ServerResponse,
    { code, message }: { code: number; message: string }
  ) => {
    const error = {
      code,
      message,
    };
  
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(code);
    res.end(JSON.stringify(error, null, 2));
  };