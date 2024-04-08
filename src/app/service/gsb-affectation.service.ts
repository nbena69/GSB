import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Travailler} from "../metier/travailler";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Secteur} from "../metier/secteur";
import {InfosVisiteur} from "../metier/infos-visiteur";

@Injectable({
  providedIn: 'root'
})
export class GsbAffectationService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  private travailler: Travailler = new Travailler;
  private _reponses = new BehaviorSubject<Travailler[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeAffectation: Travailler[] = [];
  public dataStore: { travailler: Travailler[] } = {travailler: []};
  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) { }

  getListeAffectation() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Travailler[]>(`${this.Url}/affectation`, {headers: headers}).subscribe(
      data => {
        this.listeAffectation = data;
        this._reponses.next(this.listeAffectation);
        console.log("Appel API liste Secteur reussi")
      },
      error => {
        console.log("Erreur Appel API liste Secteur", error)
      }
    )
  }

  getListeAffectationVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/affectation/affectationVisiteur/${id_visiteur}`;

    return this.http.get<Travailler>(url, {headers: headers});
  }


}
