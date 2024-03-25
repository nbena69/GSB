export class Specialite {
  public id_specialite: number = 0;
  public lib_specialite: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_specialite = json.id_specialite;
      this.lib_specialite = json.lib_specialite;
    }
  }
}
