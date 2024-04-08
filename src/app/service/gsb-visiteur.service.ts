import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {Frais} from "../metier/frais";
import {InfosVisiteur} from "../metier/infos-visiteur";

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

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  chargeVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Visiteur[]>(`${this.Url}/visiteur/getUnVisiteur/${id_visiteur}`, {headers: headers}).subscribe(
      data => {
        this.listeVisiteur = data;
        this._reponses.next(this.listeVisiteur);
        console.log("Appel API liste Frais reussi")
      },
      error => {
        console.log("Erreur Appel API liste frais", error)
      }
    )
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

  obtenirInfosAffectation(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/visiteur/obtenirInfosAffectation/${id_visiteur}`;

    return this.http.get<InfosVisiteur>(url, {headers: headers});
  }
}
