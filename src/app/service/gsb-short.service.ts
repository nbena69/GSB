import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Laboratoire} from "../metier/laboratoire";
import {Secteur} from "../metier/secteur";
import {Visiteur} from "../metier/visiteur";
import {Region} from "../metier/region";

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
  // REGION
  private region: Region = new Region;
  private _reponsesRegion = new BehaviorSubject<Region[]>([]);
  readonly appels_terminesRegion = this._reponsesRegion.asObservable();
  public listeRegion: Region[] = [];
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
    return this.http.get<Etat[]>(`${this.localUrl}/etats`
    //return this.http.get<Etat[]>(`${this.httpUrl}/etats`
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
    return this.http.get<Laboratoire[]>(`${this.localUrl}/laboratoire`
    //return this.http.get<Laboratoire[]>(`${this.httpUrl}/laboratoire`
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
    return this.http.get<Secteur[]>(`${this.localUrl}/secteur`
    // return this.http.get<Secteur[]>(`${this.httpUrl}/secteur`
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

  getListeRegion() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Region[]>(`${this.localUrl}/region`
      // return this.http.get<Region[]>(`${this.httpUrl}/region`
      , {headers: headers}).subscribe(
      data => {
        this.listeRegion = data;
        this._reponsesRegion.next(this.listeRegion);
        console.log("Appel API liste Region reussi")
      },
      error => {
        console.log("Erreur Appel API liste Region", error)
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
