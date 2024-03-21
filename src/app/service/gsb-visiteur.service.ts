import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GsbVisiteurService {
  private localUrl = 'http://localhost/benaissa/GsbFrais/public/api';
  private httpUrl = "http://gsb.benaissa.etu.lmdsio.com/api";

  private visiteur: Visiteur = new Visiteur;
  private _reponses = new BehaviorSubject<Visiteur[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeVisiteur: Visiteur[] = [];
  public dataStore: { visiteur: Visiteur[] } = {visiteur: []};

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  chargeVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Visiteur>(`${this.localUrl}/visiteur/${id_visiteur}`, {headers: headers});
  //    return this.http.get<Visiteur>(`${this.httpUrl}/visiteur/${id_visiteur}`, {headers: headers});
  }

  searchVisiteur(nom: string, id_secteur: number, id_laboratoire: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestBody = {
      "nom": nom,
      "id_secteur": id_secteur.toString(),
      "id_laboratoire": id_laboratoire.toString()
    };

    this.http.post<Visiteur>(`${this.localUrl}/visiteur/filtreVisiteur`, requestBody, { headers: headers })
      .subscribe(
        data => {
          this.visiteur = new Visiteur(data);
          this.dataStore.visiteur.push(this.visiteur);
          this._reponses.next(this.dataStore.visiteur);
          console.log(data);
          console.log("1")
        },
        error => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
  }

  searchShort(nom: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestBody = {
      "nom": nom,
    };

    this.http.post<Visiteur>(`${this.localUrl}/visiteur/filtreAvancee`, requestBody, { headers: headers })
      .subscribe(
        data => {
          this.visiteur = new Visiteur(data);
          this.dataStore.visiteur.push(this.visiteur);
          this._reponses.next(this.dataStore.visiteur);
          console.log(data);
          console.log("2")
        },
        error => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
  }
}
