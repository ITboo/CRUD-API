import { STATUS_CODE } from "../../common/constants";
import { ERRORS } from "../../common/messages";
import { ControllerType } from "../../common/types/types";
import { getDBUsers } from "../data/db";
import { sendError } from "../utils/error";
import { getData } from "../utils/request/request";
import { isIdValid } from "../utils/validator";

const getUser: ControllerType = async (req, res) => {
  try {
    const { pathname } = getData(req);
    const [requestUserId] = pathname.split('/').slice(-1);

    if (!isIdValid(requestUserId)) {
      sendError(res, ERRORS.INVALID_ID);
      return;
    }

    const users = await getDBUsers();

    const user = users.find(({ id }) => id === requestUserId);

    if (!user) {
      sendError(res, ERRORS.USER_NOT_EXIST);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(STATUS_CODE.OK);
    res.end(JSON.stringify(user, null, 2));
  } catch {
    sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default getUser;