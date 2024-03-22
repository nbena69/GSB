export class Region {
  id_region: number = 0;
  nom_region: string = "";

  constructor(json?: any) {
    if (json) {
      this.id_region = json.id_region;
      this.nom_region = json.nom_region;
    }
  }

  getRegion(): string {
    return `${this.id_region}`;
  }
}
