import { STATUS_CODE } from "../../common/constants";
import { ERRORS } from "../../common/messages";
import { ControllerType } from "../../common/types/types";
import { getDBUsers, setDBUsers } from "../data/db";
import { sendError } from "../utils/error";
import { isIdValid } from "../utils/id";

const putUser: ControllerType = async (req, res) => {
  try {
    const { pathname } = getRequestData(req);
    const [requestUserId] = pathname.split('/').slice(-1);

    if (!isIdValid(requestUserId)) {
      sendError(res, ERRORS.INVALID_ID);
      return;
    }

    const requestBody = await getRequestBody(req);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const users = await getDBUsers();
      const user = users.find(({ id }) => id === requestUserId);

      if (!user) {
        sendError(res, ERRORS.USER_NOT_EXIST);
        return;
      }

      const usersNoUpdate = users.filter(({ id }) => id !== requestUserId);
      const updatedUser = { id: requestUserId, ...verifiedUserData };

      await setDBUsers([...usersNoUpdate, updatedUser]);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(STATUS_CODE.OK);
      res.end(JSON.stringify(updatedUser, null, 2));
    } else throw new RequestBodyError();
  } catch (err) {
    if (err instanceof RequestBodyError) {
      sendError(res, ERRORS.INVALID_BODY);
    } else {
      sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default putUser;