export class Laboratoire {
  public id_laboratoire: number = 0;
  public nom_laboratoire: string = "";
  public chef_vente: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_laboratoire = json.id_laboratoire;
      this.nom_laboratoire = json.nom_laboratoire;
      this.chef_vente = json.chef_vente;
    }
  }

  public getLaboratoire(): string {
    return `${this.id_laboratoire}`;
  }
}
