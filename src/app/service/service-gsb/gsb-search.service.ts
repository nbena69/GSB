import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Visiteur} from "../../metier/api-gsb/visiteur";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Praticien} from "../../metier/api-gsb/praticien";
import {GsbAuthService} from "./gsb-auth.service";

@Injectable({
  providedIn: 'root'
})
export class GsbSearchService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  constructor(private http: HttpClient, private gsb_api: GsbAuthService) {
  }

  searchVisiteur(nom: string, id_secteur: number, id_laboratoire: number): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const params = new HttpParams()
      .set('nom', nom)
      .set('id_secteur', id_secteur.toString())
      .set('id_laboratoire', id_laboratoire.toString());

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/filtreAffectation`, {headers: headers, params: params});
  }

  searchShort(text: string): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const params = new HttpParams().set('nom', text);

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/filtreAffectAvancee`, {headers: headers, params: params});
  }

  searchVilleVisiteur(ville: string): Observable<Visiteur[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/ville/${ville}`, {headers: headers});
  }

  searchVillePraticien(ville: string): Observable<Praticien[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Praticien[]>(`${this.Url}/praticien/ville/${ville}`, {headers: headers});
  }
}
