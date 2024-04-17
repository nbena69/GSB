import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Travailler} from "../metier/travailler";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";

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

  private _reponsesAffectationVisiteur = new BehaviorSubject<Travailler[]>([]);
  readonly appels_terminesAffectationVisiteur = this._reponsesAffectationVisiteur.asObservable();
  public listeAffectationVisiteur: Travailler[] = [];

  private _reponsesAffectationUnique = new BehaviorSubject<Travailler[]>([]);
  readonly appels_terminesAffectationUnique = this._reponsesAffectationUnique.asObservable();
  public listeAffectationUnique: Travailler[] = [];

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeAffectationVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Travailler[]>(`${this.Url}/affectation/affectationVisiteur/${id_visiteur}`, {headers: headers}).subscribe(
      data => {
        this.listeAffectationVisiteur = data;
        this._reponsesAffectationVisiteur.next(this.listeAffectationVisiteur);
        console.log("Appel API liste Affectation visiteur reussi")
      },
      error => {
        console.log("Erreur Appel API liste Etats", error)
      }
    )
  }

  getListeAffectationUnique(id_travail: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/affectation/affectationUnique/${id_travail}`;

    return this.http.get<Travailler>(url, {headers: headers});
  }

  ajoutAffectation(id_visiteur: number, jjmmaa: string, id_region: number, role_visiteur: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_visiteur": id_visiteur,
      "jjmmaa": jjmmaa,
      "id_region": id_region,
      "role_visiteur": role_visiteur
    };

    this.http.post<Travailler>(`${this.Url}/affectation/ajoutAffectation`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.travailler = new Travailler(data);
          this.dataStore.travailler.push(this.travailler);
          this._reponses.next(this.dataStore.travailler);
          this.router.navigate(['searchVisiteur']);
          console.log("Appel réussi ajout affect");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  updateAffectation(id_travail: number, id_visiteur: number, jjmmaa: string, id_region: number, role_visiteur: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_visiteur": id_visiteur,
      "jjmmaa": jjmmaa,
      "id_region": id_region,
      "role_visiteur": role_visiteur,
    };

    this.http.put<Travailler>(`${this.Url}/affectation/updateAffectation/${id_travail}`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.travailler = new Travailler(data);
          this.dataStore.travailler.push(this.travailler);
          this._reponses.next(this.dataStore.travailler);
          this.router.navigate(['searchVisiteur']);
          console.log("Appel réussi Modif affect");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  deleteAffectation(id_travail: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/affectation/deleteAffectation/${id_travail}`;

    return this.http.delete<void>(url, {headers: headers});
  }
}
