import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";

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

  searchVisiteur(nom: string, id_secteur: number, id_laboratoire: number): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const params = new HttpParams()
      .set('nom', nom)
      .set('id_secteur', id_secteur.toString())
      .set('id_laboratoire', id_laboratoire.toString());

    return this.http.get<Visiteur[]>(`${this.localUrl}/visiteur/filtreVisiteur`, { headers: headers, params: params });
  }

  searchShort(nom: string): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const params = new HttpParams().set('nom', nom);

    return this.http.get<Visiteur[]>(`${this.localUrl}/visiteur/filtreAvancee`, { headers: headers, params: params });
  }
}
