import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbAuthService} from "./gsb-auth.service";
import {Laboratoire} from "../metier/laboratoire";
import {Secteur} from "../metier/secteur";
import {Visiteur} from "../metier/visiteur";
import {Region} from "../metier/region";
import {Specialite} from "../metier/specialite";

@Injectable({
  providedIn: 'root'
})

export class GsbShortService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

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
  // SPECIALITE
  private specialite: Specialite = new Specialite;
  private _reponsesSpecialite = new BehaviorSubject<Specialite[]>([]);
  readonly appels_terminesSpecialite = this._reponsesSpecialite.asObservable();
  public listeSpecialite: Specialite[] = [];
  // VISITEUR
  private visiteur: Visiteur = new Visiteur;
  private _reponsesVisiteur = new BehaviorSubject<Visiteur[]>([]);
  readonly appels_terminesVisiteur = this._reponsesVisiteur.asObservable();
  public listeVisiteur: Visiteur[] = [];
  // VISITEUR
  private regionSecteur: Region = new Region();
  private _reponsesRegionSecteur = new BehaviorSubject<Region[]>([]);
  readonly appels_terminesRegionSecteur = this._reponsesRegionSecteur.asObservable();
  public listeRegionSecteur: Region[] = [];

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbAuthService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Etat[]>(`${this.Url}/etats`, {headers: headers}).subscribe(
      data => {
        this.listeEtat = data;
        this._reponsesEtat.next(this.listeEtat);
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
    return this.http.get<Laboratoire[]>(`${this.Url}/laboratoire`, {headers: headers}).subscribe(
      data => {
        this.listeLaboratoire = data;
        this._reponsesLaboratoire.next(this.listeLaboratoire);
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
    return this.http.get<Secteur[]>(`${this.Url}/secteur`, {headers: headers}).subscribe(
      data => {
        this.listeSecteur = data;
        this._reponsesSecteur.next(this.listeSecteur);
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
    return this.http.get<Region[]>(`${this.Url}/region`, {headers: headers}).subscribe(
      data => {
        this.listeRegion = data;
        this._reponsesRegion.next(this.listeRegion);
      },
      error => {
        console.log("Erreur Appel API liste Region", error)
      }
    )
  }

  getListeSpecialite() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Specialite[]>(`${this.Url}/specialite`, {headers: headers}).subscribe(
      data => {
        this.listeSpecialite = data;
        this._reponsesSpecialite.next(this.listeSpecialite);
      },
      error => {
        console.log("Erreur Appel API liste Specialite", error)
      }
    )
  }

  getListeRegionSecteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Region[]>(`${this.Url}/region-secteur`, {headers: headers}).subscribe(
      data => {
        this.listeRegionSecteur = data;
        this._reponsesRegionSecteur.next(this.listeRegionSecteur);
      },
      error => {
        console.log("Erreur Appel API liste Etats", error)
      }
    )
  }

  getListeVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Visiteur[]>(`${this.Url}/visiteur`, {headers: headers}).subscribe(
      data => {
        this.listeVisiteur = data;
        this._reponsesVisiteur.next(this.listeVisiteur);
      },
      error => {
        console.log("Erreur Appel API liste Visiteur", error)
      }
    )
  }
}
