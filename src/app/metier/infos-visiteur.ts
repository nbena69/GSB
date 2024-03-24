import { Region } from './region';

export class InfosVisiteur {
  public id_visiteur: number = 0;
  public nom_visiteur: string = "";
  public prenom_visiteur: string = "";
  public id_laboratoire: number = 0;
  public regions: { region: Region, jjmmaa: Date }[] = [];

  constructor(json?: any) {
    if (json) {
      this.id_visiteur = json.id_visiteur;
      this.nom_visiteur = json.nom_visiteur;
      this.prenom_visiteur = json.prenom_visiteur;
      this.id_laboratoire = json.id_laboratoire;
      this.regions = json.regions;
    }
  }
}
