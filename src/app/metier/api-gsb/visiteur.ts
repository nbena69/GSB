export class Visiteur {
  id_visiteur: number = 0;
  nom_visiteur: string = "";
  prenom_visiteur: string = "";
  type_visiteur: string = "";
  login: string = "";
  password: string = "";
  id_laboratoire: number = 0;
  id_secteur: number = 0;
  adresse_visiteur: string = "";
  cp_visiteur: string = "";
  ville_visiteur: string = "";
  date_embauche: Date | null = null;

  constructor(json?: any) {
    if (json) {
      this.id_visiteur = json.id_visiteur;
      this.nom_visiteur = json.nom_visiteur;
      this.prenom_visiteur = json.prenom_visiteur;
      this.type_visiteur = json.type_visiteur;
      this.login = json.login;
      this.password = json.password;
      this.id_laboratoire = json.id_laboratoire;
      this.id_secteur = json.id_secteur;
      this.adresse_visiteur = json.adresse_visiteur;
      this.cp_visiteur = json.cp_visiteur;
      this.ville_visiteur = json.ville_visiteur;
      this.date_embauche = json.date_embauche ? new Date(json.date_embauche) : null;
    }
  }
  public getVisiteur(): string {
    return `${this.id_visiteur}`;
  }
}
