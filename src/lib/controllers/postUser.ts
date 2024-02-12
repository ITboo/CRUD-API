import { STATUS_CODE } from "../../common/constants";
import { ERRORS } from "../../common/messages";
import { ControllerType } from "../../common/types/types";
import { getDBUsers, setDBUsers } from "../data/db";
import { sendError } from "../utils/error";

const postUser: ControllerType = async (req, res) => {
  try {
    const requestBody = await getRequestBody(req);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const users = await getDBUsers();

      const alreadyExistUsersIds = users.map(({ id }) => id);
      const id = generateId(alreadyExistUsersIds);

      const newUser = { id, ...verifiedUserData };

      await setDBUsers([...users, newUser]);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(STATUS_CODE.CREATED);
      res.end(JSON.stringify(newUser, null, 2));
    } else throw new RequestBodyError();
  } catch (err) {
    if (err instanceof RequestBodyError) {
      sendError(res, ERRORS.INVALID_BODY);
    } else {
      sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default postUser;