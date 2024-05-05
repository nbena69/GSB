export class Adresse {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  type: string;
  importance: number;
  street: string;

  constructor(data: any) {
    this.label = data.properties.label;
    this.score = data.properties.score;
    this.housenumber = data.properties.housenumber;
    this.id = data.properties.id;
    this.name = data.properties.name;
    this.postcode = data.properties.postcode;
    this.citycode = data.properties.citycode;
    this.x = data.properties.x;
    this.y = data.properties.y;
    this.city = data.properties.city;
    this.context = data.properties.context;
    this.type = data.properties.type;
    this.importance = data.properties.importance;
    this.street = data.properties.street;
  }
}
