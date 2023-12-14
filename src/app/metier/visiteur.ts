export class Visiteur {
  id_visiteur: number = 0;
  nom_visiteur: string = "";
  prenom_visiteur: string = "";
  type_visiteur: string = "";
  login: string = "";
  password: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_visiteur = json.id_visiteur;
      this.nom_visiteur = json.nom_visiteur;
      this.prenom_visiteur = json.prenom_visiteur;
      this.type_visiteur = json.type_visiteur;
      this.login = json.login;
      this.password = json.password;
    }
  }
}
