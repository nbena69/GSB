import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Fraishorsforfait} from "../metier/fraishorsforfait";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Frais} from "../metier/frais";

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

  deleteFraisHorsForfait(id_fraishorsforfait: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `http://localhost/benaissa/GsbFrais/public/api/fraishorsforfait/deleteFraisHorsForfait/${id_fraishorsforfait}`;
    //const url = `http://gsb.benaissa.etu.lmdsio.com/api/fraishorsforfait/deleteFraisHorsForfait/${id_fraishorsforfait}`;

    return this.http.delete<void>(url, {headers: headers});
  }

  chargeFraisHorsForfait(id_fraishorsforfait: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `http://localhost/benaissa/GsbFrais/public/api/fraishorsforfait/getUnFraisHorsForfait/${id_fraishorsforfait}`;
    //const url = `http://gsb.benaissa.etu.lmdsio.com/api/fraishorsforfait/getUnFraisHorsForfait/${id_fraishorsforfait}`;

    return this.http.get<Fraishorsforfait>(url, {headers: headers});
  }
}
