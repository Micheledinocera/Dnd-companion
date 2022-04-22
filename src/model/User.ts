export interface IUser {
  name: string;
  email: string;
  uid: string;
}

export class User {
  static tableName = "Utenti" as string;
  public name: string;
  public email: string;
  public uid: string;

  constructor(data?: IUser) {
    this.name = data ? data.name : "";
    this.email = data ? data.email : "";
    this.uid = data ? data.uid : "";
  }
}
