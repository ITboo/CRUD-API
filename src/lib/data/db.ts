import { DB_PORT } from "../../common/constants";
import { UserType } from "../../common/types/types";

export const getDBUsers: () => Promise<UserType[]> = async () => {
  const response = await fetch(`http://localhost:${DB_PORT}`);
  const users = await response.json();
  return users;
};

export const setDBUsers: (users: UserType[]) => Promise<void> = async (
  users
) => {
  const response = await fetch(`http://localhost:${DB_PORT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  });

  if (!response.ok) {
    throw Error("");
  }
};
