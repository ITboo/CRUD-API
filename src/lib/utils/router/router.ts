import deleteUser from "../../controllers/deleteUser";
import getUser from "../../controllers/getUser";
import getUsers from "../../controllers/getUsers";
import postUser from "../../controllers/postUser";
import putUser from "../../controllers/putUser";

import { RouteType } from "../../../common/types/types";

export const usersRoutes: RouteType[] = [
    {
      endpoint: '/api/users',
      method: 'GET',
      endpointPathParts: 2,
      controller: getUsers,
    },
    {
      endpoint: '/api/users',
      method: 'GET',
      endpointPathParts: 3,
      controller: getUser,
    },
    {
      endpoint: '/api/users',
      method: 'POST',
      endpointPathParts: 2,
      controller: postUser,
    },
    {
      endpoint: '/api/users',
      method: 'PUT',
      endpointPathParts: 3,
      controller: putUser,
    },
    {
      endpoint: '/api/users',
      method: 'DELETE',
      endpointPathParts: 3,
      controller: deleteUser,
    },
  ];