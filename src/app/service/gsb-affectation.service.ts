import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Travailler} from "../metier/travailler";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Frais} from "../metier/frais";

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
}
