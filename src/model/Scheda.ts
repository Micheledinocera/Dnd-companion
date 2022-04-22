export interface IScheda {
  nome: string;
  id: string;
  classe: string[];
  livello: number[];
}

export class Scheda {
  static tableName = "Schede" as string;
  public nome: string;
  public id: string;
  public classe: string[];
  public livello: number[];

  constructor(data?: IScheda) {
    this.nome = data ? data.nome : "";
    this.id = data ? data.id : "";
    this.classe = data ? data.classe : [];
    this.livello = data ? data.livello : [];
  }
}
