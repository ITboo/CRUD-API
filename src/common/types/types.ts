import { IncomingMessage, ServerResponse } from "http";

export type ControllerType = (
  req: IncomingMessage,
  res: ServerResponse
) => void;

export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type RouteType = {
  endpoint: '/api/users';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpointPathParts: number;
  controller: ControllerType;
};
