import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbAuthService} from "./gsb-auth.service";
import {Visiteur} from "../metier/api-gsb/visiteur";
import {BehaviorSubject, Observable} from "rxjs";

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

  //FILTRE VISITEUR
  searchVisiteur(nom: string, id_secteur: number, id_laboratoire: number): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const params = new HttpParams()
      .set('nom', nom)
      .set('id_secteur', id_secteur.toString())
      .set('id_laboratoire', id_laboratoire.toString());

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/filtreAffectation`, { headers: headers, params: params });
  }

  searchShort(nom: string): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const params = new HttpParams().set('nom', nom);

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/filtreAffectAvancee`, { headers: headers, params: params });
  }
}
