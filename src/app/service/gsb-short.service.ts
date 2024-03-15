import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Laboratoire} from "../metier/laboratoire";
import {Secteur} from "../metier/secteur";
import {Visiteur} from "../metier/visiteur";

@Injectable({
  providedIn: 'root'
})

export class GsbShortService {
  private localUrl = 'http://localhost/benaissa/GsbFrais/public/api';
  private httpUrl = "http://gsb.benaissa.etu.lmdsio.com/api";

  // ETAT
  private etat: Etat = new Etat;
  private _reponsesEtat = new BehaviorSubject<Etat[]>([]);
  readonly appels_terminesEtat = this._reponsesEtat.asObservable();
  public listeEtat: Etat[] = [];
  // LABORATOIRE
  private laboratoire: Laboratoire = new Laboratoire;
  private _reponsesLaboratoire = new BehaviorSubject<Laboratoire[]>([]);
  readonly appels_terminesLaboratoire = this._reponsesLaboratoire.asObservable();
  public listeLaboratoire: Laboratoire[] = [];
  // SECTEUR
  private secteur: Secteur = new Secteur;
  private _reponsesSecteur = new BehaviorSubject<Secteur[]>([]);
  readonly appels_terminesSecteur = this._reponsesSecteur.asObservable();
  public listeSecteur: Secteur[] = [];
  // VISITEUR
  private visiteur: Visiteur = new Visiteur;
  private _reponsesVisiteur = new BehaviorSubject<Visiteur[]>([]);
  readonly appels_terminesVisiteur = this._reponsesVisiteur.asObservable();
  public listeVisiteur: Visiteur[] = [];

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Etat[]>(`${this.localUrl}/frais/etats`
    //return this.http.get<Etat[]>(`${this.httpUrl}/frais/etats`
      , {headers: headers}).subscribe(
      data => {
        this.listeEtat = data;
        this._reponsesEtat.next(this.listeEtat);
        console.log("Appel API liste Etats reussi")
      },
      error => {
        console.log("Erreur Appel API liste Etats", error)
      }
    )
  }

  getListeLaboratoire() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Laboratoire[]>(`${this.localUrl}/frais/laboratoire`
    //return this.http.get<Laboratoire[]>(`${this.httpUrl}/frais/laboratoire`
      , {headers: headers}).subscribe(
      data => {
        this.listeLaboratoire = data;
        this._reponsesLaboratoire.next(this.listeLaboratoire);
        console.log("Appel API liste Laboratoire reussi")
      },
      error => {
        console.log("Erreur Appel API liste Laboratoire", error)
      }
    )
  }

  getListeSecteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Secteur[]>(`${this.localUrl}/frais/secteur`
    // return this.http.get<Secteur[]>(`${this.httpUrl}/frais/secteur`
      , {headers: headers}).subscribe(
      data => {
        this.listeSecteur = data;
        this._reponsesSecteur.next(this.listeSecteur);
        console.log("Appel API liste Secteur reussi")
      },
      error => {
        console.log("Erreur Appel API liste Secteur", error)
      }
    )
  }

  getListeVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Visiteur[]>(`${this.localUrl}/visiteur`
      // return this.http.get<Visiteur[]>(`${this.httpUrl}/visiteur`
      , {headers: headers}).subscribe(
      data => {
        this.listeVisiteur = data;
        this._reponsesVisiteur.next(this.listeVisiteur);
        console.log("Appel API liste Visiteur reussi")
      },
      error => {
        console.log("Erreur Appel API liste Visiteur", error)
      }
    )
  }
}
