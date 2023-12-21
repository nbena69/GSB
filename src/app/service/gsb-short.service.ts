import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Frais} from "../metier/frais";
import {Laboratoire} from "../metier/laboratoire";
import {Secteur} from "../metier/secteur";

@Injectable({
  providedIn: 'root'
})

export class GsbShortService {
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

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    //return this.http.get<Etat[]>("http://localhost/benaissa/GsbFrais/public/api/frais/etats"
      return this.http.get<Etat[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/etats"
      , {headers: headers}).subscribe(
      data => {
        this.listeEtat = data;
        this._reponsesEtat.next(this.listeEtat);
        console.log("Appel API liste Etats reussi")
      },
      error => console.log("Erreur Appel API liste Etats")
    )
  }

  getListeLaboratoire() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    //return this.http.get<Laboratoire[]>("http://localhost/benaissa/GsbFrais/public/api/frais/laboratoire"
      return this.http.get<Laboratoire[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/laboratoire"
      , {headers: headers}).subscribe(
      data => {
        this.listeLaboratoire = data;
        this._reponsesLaboratoire.next(this.listeLaboratoire);
        console.log("Appel API liste Laboratoire reussi")
      },
      error => console.log("Erreur Appel API liste Laboratoire")
    )
  }

  getListeSecteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    //return this.http.get<Secteur[]>("http://localhost/benaissa/GsbFrais/public/api/frais/secteur"
      return this.http.get<Secteur[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/secteur"
      , {headers: headers}).subscribe(
      data => {
        this.listeSecteur = data;
        this._reponsesSecteur.next(this.listeSecteur);
        console.log("Appel API liste Secteur reussi")
      },
      error => console.log("Erreur Appel API liste Secteur")
    )
  }
}
