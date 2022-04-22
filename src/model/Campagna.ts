import { Scheda } from "./Scheda";
import { User } from "./User";

export interface ICampagna {
  name: string;
  id: string;
  master: User;
  players: User[];
  schede: Scheda[];
}

export class Campagna {
  static tableName = "Campagne" as string;
  public name: string;
  public id: string;
  public master: User;
  public players: User[];
  public schede: Scheda[];

  constructor(data?: ICampagna) {
    this.name = data ? data.name : "";
    this.id = data ? data.id : "";
    this.master = data ? data.master : new User();
    this.players = data ? data.players : [];
    this.schede = data ? data.schede : [];
  }
}
