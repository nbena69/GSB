export class Travailler {
  public id_visiteur : number = 0;
  public jjmmaa: Date | null = null;
  public id_region: number = 0;
  public role_visiteur: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_visiteur = json.id_visiteur;
      this.jjmmaa = json.jjmmaa;
      this.id_region = json.id_region;
      this.role_visiteur = json.role_visiteur;
    }
  }
}
