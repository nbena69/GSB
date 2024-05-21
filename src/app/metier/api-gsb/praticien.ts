export class Praticien {
  id_praticien: number = 0;
  id_type_praticien: number | null = null;
  nom_praticien: string = "";
  prenom_praticien: string = "";
  adresse_praticien: string = "";
  cp_praticien: string = "";
  ville_praticien: string = "";
  coef_notoriete: number | null = null;

  constructor(json?: any) {
    if (json) {
      this.id_praticien = json.id_praticien;
      this.id_type_praticien = json.id_type_praticien;
      this.nom_praticien = json.nom_praticien;
      this.prenom_praticien = json.prenom_praticien;
      this.adresse_praticien = json.adresse_praticien;
      this.cp_praticien = json.cp_praticien;
      this.ville_praticien = json.ville_praticien;
      this.coef_notoriete = json.coef_notoriete;
    }
  }

  public getPraticien(): string {
    return `${this.id_praticien}`;
  }
}
