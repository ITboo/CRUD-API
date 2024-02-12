import "dotenv/config";

export const PORT = Number(process.env.PORT) || 4000;
export const DB_PORT = Number(process.env.DB_PORT) || 3000;

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
};

export class RequestBodyError extends Error {};