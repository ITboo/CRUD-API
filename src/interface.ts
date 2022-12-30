export interface IUser {
    id: string; //uuid
    username: string; //required
    age: number; //required
    hobbies: string[]; //required
};

export interface IDialog {
    status: string;
    message?: string;
    data?: User | User[];
};
