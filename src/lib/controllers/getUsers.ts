import { STATUS_CODE } from "../../common/constants";
import { ERRORS } from "../../common/messages";
import { ControllerType } from "../../common/types/types";
import { getDBUsers } from "../data/db";
import { sendError } from "../utils/error";

const getUsers: ControllerType = async (req, res) => {
  try {
    const users = await getDBUsers();

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(STATUS_CODE.OK);
    res.end(JSON.stringify(users, null, 2));
  } catch {
    sendError(res, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default getUsers;