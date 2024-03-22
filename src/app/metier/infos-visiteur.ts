export class InfosVisiteur {
  public nom_visiteur: string = "";
  public prenom_visiteur: string = "";
  public id_secteur: number = 0;
  public id_region: number = 0;
  public id_laboratoire: number = 0;

  constructor(json?: any) {
    if (json) {
      this.nom_visiteur = json.nom_visiteur;
      this.prenom_visiteur = json.prenom_visiteur;
      this.id_secteur = json.id_secteur;
      this.id_region = json.id_region;
      this.id_laboratoire = json.id_laboratoire;
    }
  }
}
