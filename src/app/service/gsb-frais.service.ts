import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Frais} from '../metier/frais';
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GsbFraisService {
  private frais: Frais = new Frais;
  private _reponses = new BehaviorSubject<Frais[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFrais: Frais[] = [];
  public dataStore: { frais: Frais[] } = {frais: []};

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  listeFraisDuVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    //return this.http.get<Frais[]>("http://localhost/benaissa/GsbFrais/public/api/frais/visiteur/"
    return this.http.get<Frais[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/visiteur/"
      + this.gsb_api.visiteurId()
      , {headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
        console.log("Appel API liste Frais reussi")
      },
      error => console.log("Erreur Appel API liste frais")
    )
  }

  updateFrais(id_frais: number, anneemois: string, nbjustificatifs: number, montantvalide: number, id_etat: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const requestObject = {
      "id_frais": id_frais,
      "nbjustificatifs": nbjustificatifs,
      "montantvalide": montantvalide,
      "anneemois": anneemois,
      "id_etat": id_etat,
      "id_visiteur": this.gsb_api.visiteurId(),
      "datemodification": formattedDate
    };
    //this.http.put<Frais>(`http://localhost/benaissa/GsbFrais/public/api/frais/updateFrais/${id_frais}`
    this.http.put<Frais>(`http://gsb.benaissa.etu.lmdsio.com/api/frais/updateFrais/${id_frais}`
      , requestObject, {headers: headers})
      .subscribe(
        data => {
          this.frais = new Frais(data);
          this.dataStore.frais.push(this.frais);
          this._reponses.next(this.dataStore.frais);
          this.router.navigate(['frais/liste']);
          console.log("Appel réussi");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  ajoutFrais(anneemois: string, nbjustificatifs: number, montantvalide: number, id_etat: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const requestObject = {
      "nbjustificatifs": nbjustificatifs,
      "montantvalide": montantvalide,
      "anneemois": anneemois,
      "id_etat": id_etat,
      "id_visiteur": this.gsb_api.visiteurId(),
      "datemodification": formattedDate
    };
    //this.http.post<Frais>(`http://localhost/benaissa/GsbFrais/public/api/frais/ajoutFrais`
    this.http.post<Frais>(`http://gsb.benaissa.etu.lmdsio.com/api/frais/ajoutFrais`
      , requestObject, {headers: headers})
      .subscribe(
        data => {
          this.frais = new Frais(data);
          this.dataStore.frais.push(this.frais);
          this._reponses.next(this.dataStore.frais);
          this.router.navigate(['frais/liste']);
          console.log("Appel réussi");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  deleteFrais(id_frais: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
     //const url = `http://localhost/benaissa/GsbFrais/public/api/frais/deleteFrais/${id_frais}`;
     const url = `http://gsb.benaissa.etu.lmdsio.com/api/frais/deleteFrais/${id_frais}`;

    return this.http.delete<void>(url, {headers: headers});
  }

  chargeFrais(id_frais: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    //const url = `http://localhost/benaissa/GsbFrais/public/api/frais/getUnFrais/${id_frais}`;
    const url = `http://gsb.benaissa.etu.lmdsio.com/api/frais/getUnFrais/${id_frais}`;

    return this.http.get<Frais>(url, {headers: headers});
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
