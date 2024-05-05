export class Travailler {
  public id_travail : number = 0;
  public id_visiteur : number = 0;
  public jjmmaa: Date | null = null;
  public role_visiteur: string = "";
  public id_region: number = 0;
  public nom_region: string = "";
  public id_secteur: number = 0;

  constructor(json?: any) {
    if (json) {
      this.id_travail = json.id_travail;
      this.id_visiteur = json.id_visiteur;
      this.jjmmaa = json.jjmmaa;
      this.role_visiteur = json.role_visiteur;
      this.id_region = json.id_region;
      this.nom_region = json.nom_region;
      this.id_secteur = json.id_secteur;
    }
  }
}
