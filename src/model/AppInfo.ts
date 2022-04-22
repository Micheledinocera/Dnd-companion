export interface IAppInfo {
  nome: string;
  version: string;
}

export class AppInfo {
  static tableName = "AppInfo" as string;
  public nome: string;
  public version: string;

  constructor(data?: IAppInfo) {
    this.nome = data ? data.nome : "";
    this.version = data ? data.version : "0.0";
  }
}
