import { DB_PORT } from "../../common/constants";
import { UserIdType, UserType } from "../../common/types/types";

export default class DB {
  users: UserType[];

  constructor() {
    this.users = [];
  }

  checkId(id: UserIdType) {
    const usersIds = this.getUserIds();
    if (usersIds.includes(id)) throw Error('User id already exist');
  }

  getUsers() {
    return this.users;
  }

  setUsers(users: UserType[]) {
    this.users = users;
  }

  getUser(userId: UserIdType) {
    return this.users.find(({ id }) => id === userId);
  }

  addUser(user: UserType) {
    this.checkId(user.id);
    this.users = [...this.users, user];
  }

  updateUser(userToUpdate: UserType) {
    const user = this.getUser(userToUpdate.id);

    if (!user) return;

    if (user) {
      this.users = [...this.users.filter(({ id }) => id !== userToUpdate.id), userToUpdate];
      return userToUpdate;
    }
  }

  deleteUser(userId: UserIdType) {
    const user = this.getUser(userId);

    if (!user) return;

    if (user) {
      this.users = this.users.filter(({ id }) => id !== userId);
      return user;
    }
  }

  getUserIds() {
    return this.users.map(({ id }) => id);
  }
}

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
