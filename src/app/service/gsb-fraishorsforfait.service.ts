import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Fraishorsforfait} from "../metier/fraishorsforfait";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";

@Injectable({
  providedIn: 'root'
})
export class GsbFraishorsforfaitService {
  private fraisHorsForfait: Fraishorsforfait = new Fraishorsforfait();
  private _reponses = new BehaviorSubject<Fraishorsforfait[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFraisHF: Fraishorsforfait[] = [];
  public dataStore: { fraisHorsForfait: Fraishorsforfait[] } = {fraisHorsForfait: []};
  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {

  }

  listeFraisHorsForfait(id_frais: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Fraishorsforfait[]>("http://localhost/benaissa/GsbFrais/public/api/fraishorsforfait/"
    //return this.http.get<Fraishorsforfait[]>("http://gsb.benaissa.etu.lmdsio.com/api/fraishorsforfait/"
      + id_frais
      , {headers: headers}).subscribe(
      data => {
        this.listeFraisHF = data;
        this._reponses.next(this.listeFraisHF);
        console.log("Appel API liste Frais Hors Forfait reussi")
      },
      error => console.log("Erreur Appel API liste frais Hors Forfait")
    )
  }
}
