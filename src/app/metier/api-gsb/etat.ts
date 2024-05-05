export class Etat {
  public id_etat: number = 0;
  public lib_etat: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_etat = json.id_etat;
      this.lib_etat = json.lib_etat;
    }
  }

  public getEtat(): string {
    return `${this.id_etat}`;
  }
}
