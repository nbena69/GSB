export class Frais {
  public id_frais: number = 0;
  public id_etat: number = 0;
  public anneemois: string = "";
  public id_visiteur: number = 0;
  public nbjustificatifs: number | null = null;
  public datemodification: string | null = null;
  public montantvalide: number | null = null;

  constructor(json?: any) {
    if (json) {
      this.id_frais = json.id_frais;
      this.id_etat = json.id_etat;
      this.anneemois = json.anneemois;
      this.id_visiteur = json.id_visiteur;
      this.nbjustificatifs = json.nbjustificatifs;
      this.datemodification = json.datemodification;
      this.montantvalide = json.montantvalide;
    }
  }

  public getFrais(): string {
    return `${this.id_frais}`;
  }
}
