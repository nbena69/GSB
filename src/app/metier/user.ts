export class User {
  public id_visiteur: number = 0;
  public id_laboratoire: number = 0;
  public id_secteur: number = 0;
  public nom_visiteur: string = "";
  public prenom_visiteur: string = "";
  public adresse_visiteur: string = "";
  public cp_visiteur: string = "";
  public ville_visiteur: string = "";
  public date_embauche: Date | null = null;
  public login_visiteur: string = "";
  public pwd_visiteur: string = "";
  public type_visiteur: string = "";
  public remember_token: string = "";
  public created_at: Date = new Date();
  public updated_at: Date = new Date();

  constructor(json?: any) {
    if (json) {
      this.id_visiteur = json.id_visiteur;
      this.id_laboratoire = json.id_laboratoire;
      this.id_secteur = json.id_secteur;
      this.nom_visiteur = json.nom_visiteur;
      this.prenom_visiteur = json.prenom_visiteur;
      this.adresse_visiteur = json.adresse_visiteur;
      this.cp_visiteur = json.cp_visiteur;
      this.ville_visiteur = json.ville_visiteur;
      this.date_embauche = json.date_embauche ? new Date(json.date_embauche) : null;
      this.login_visiteur = json.login_visiteur;
      this.pwd_visiteur = json.pwd_visiteur;
      this.type_visiteur = json.type_visiteur;
      this.remember_token = json.remember_token;
      this.created_at = json.created_at ? new Date(json.created_at) : new Date();
      this.updated_at = json.updated_at ? new Date(json.updated_at) : new Date();
    }
  }

  public getUser(): string {
    return `${this.id_visiteur}`;
  }
}
