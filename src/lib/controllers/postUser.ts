import { RequestError, STATUS_CODE } from "../../common/constants";
import { ERRORS } from "../../common/messages";
import { ControllerType, UserIdType } from "../../common/types/types";
import { getDBUsers, setDBUsers } from "../data/db";
import { sendError } from "../utils/error";
import { getBody, verifyBody } from "../utils/request/request";
import { v4 as newUUID } from 'uuid';

const postUser: ControllerType = async (req, res) => {
  try {
    const requestBody = await getBody(req);
    const verifiedUserData = verifyBody(requestBody);

    if (verifiedUserData) {
      const users = await getDBUsers();

      const alreadyExistUsersIds = users.map(({ id }) => id);
      const id = generateId(alreadyExistUsersIds);

      const newUser = { id, ...verifiedUserData };

      await setDBUsers([...users, newUser]);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(STATUS_CODE.CREATED);
      res.end(JSON.stringify(newUser, null, 2));
    } else throw new RequestError();
  } catch (err) {
    if (err instanceof RequestError) {
      sendError(res, ERRORS.INVALID_BODY);
    } else {
      sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

const generateId: (ids: UserIdType[]) => UserIdType = (ids) => {
  const maxGenerateTimes = 100;

  for (let i = 0; i < maxGenerateTimes; i += 1) {
    const id = newUUID();
    if (!ids.includes(id)) return id;
  }

  throw new Error("Can't generate id");
};

export default postUser;