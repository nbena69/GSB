import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbAuthService} from "./gsb-auth.service";
import {Visiteur} from "../../metier/api-gsb/visiteur";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GsbVisiteurService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  private visiteur: Visiteur = new Visiteur;
  private _reponses = new BehaviorSubject<Visiteur[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeVisiteur: Visiteur[] = [];
  public dataStore: { visiteur: Visiteur[] } = {visiteur: []};

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbAuthService) {
  }

  chargeVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/visiteur/getUnVisiteur/${id_visiteur}`;

    return this.http.get<Visiteur>(url, {headers: headers});
  }

  updateVisiteur(id_visiteur: number, adresse_visiteur: string, cp_visiteur: string, ville_visiteur: string, id_laboratoire: number, id_secteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_visiteur": id_visiteur,
      "adresse_visiteur": adresse_visiteur,
      "cp_visiteur": cp_visiteur,
      "ville_visiteur": ville_visiteur,
      "id_laboratoire": id_laboratoire,
      "id_secteur": id_secteur
    };
    this.http.put<Visiteur>(`${this.Url}/visiteur/updateVisiteur/${id_visiteur}`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.visiteur = new Visiteur(data);
          this.dataStore.visiteur.push(this.visiteur);
          this._reponses.next(this.dataStore.visiteur);
          this.router.navigate(['']);
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  updatePwdVisiteur(id_visiteur: number, pwd_actually: string, pwd_visiteur: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_visiteur": id_visiteur,
      "pwd_actually": pwd_actually,
      "pwd_visiteur": pwd_visiteur
    };
    this.http.put<Visiteur>(`${this.Url}/visiteur/updatePwdVisiteur/${id_visiteur}`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.visiteur = new Visiteur(data);
          this.dataStore.visiteur.push(this.visiteur);
          this._reponses.next(this.dataStore.visiteur);
          this.router.navigate(['']);
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }
}
