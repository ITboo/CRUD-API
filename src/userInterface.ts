export interface IUser {
    id: {type:string, required:true} //uuid
    username: {type:string, required:true}
    age: {type:number, required:true};
    hobbies: {type:string[], required:true};
  }