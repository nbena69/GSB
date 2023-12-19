export class Secteur {
  public id_secteur: number = 0;
  public lib_secteur: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_secteur = json.id_secteur;
      this.lib_secteur = json.lib_secteur;
    }
  }

  public getSecteur(): string {
    return `${this.id_secteur}`;
  }
}
