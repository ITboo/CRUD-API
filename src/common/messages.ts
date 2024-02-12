import { STATUS_CODE } from "./constants";

export const START = "Server is running on port: ";

export const ERRORS = {
    INVALID_ID: {
      code: STATUS_CODE.BAD_REQUEST,
      message: "{userId} is invalid (not uuid)!",
    },
    INVALID_BODY: {
      code: STATUS_CODE.BAD_REQUEST,
      message: "Request body doesn't contain required fields",
    },
    NO_ENDPOINT: {
      code: STATUS_CODE.NOT_FOUND,
      message: "Oops! Endpoint doesn't exist",
    },
    USER_NOT_EXIST: {
      code: STATUS_CODE.NOT_FOUND,
      message: "User doesn't exist",
    },
    INTERNAL_SERVER_ERROR: {
      code: STATUS_CODE.SERVER_ERROR,
      message: "Internal Server Error",
    },
  };