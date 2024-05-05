export class ActiviteCompl {
  public id_activite_compl: number = 0;
  public date_activite: Date | null = null;
  public lieu_activite: string = "";
  public theme_activite: string = "";
  public motif_activite: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_activite_compl = json.id_activite_compl;
      this.date_activite = json.date_activite;
      this.lieu_activite = json.lieu_activite;
      this.theme_activite = json.theme_activite;
      this.motif_activite = json.motif_activite;
    }
  }
}
