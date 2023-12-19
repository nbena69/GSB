export class Fraishorsforfait {
  public id_fraishorsforfait: number = 0;
  public id_frais: number = 0;
  public date_fraishorsforfait: Date | null = null;
  public montant_fraishorsforfait: number = 0;
  public lib_fraishorsforfait: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_fraishorsforfait = json.id_fraishorsforfait;
      this.id_frais = json.id_frais;
      this.date_fraishorsforfait = json.date_fraishorsforfait;
      this.montant_fraishorsforfait = json.montant_fraishorsforfait;
      this.lib_fraishorsforfait = json.lib_fraishorsforfait;
    }
  }

  public getFraisHorsForfait(): string {
    return `${this.id_fraishorsforfait}`;
  }
}
