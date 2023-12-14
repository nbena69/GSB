import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Frais } from '../metier/frais';
import {GsbLoginService} from "./gsb-login.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class GsbFraisService {
  //API = 'http://localhost/benaissa/GsbFrais/public/api/frais';
  //API = 'http://gsb.benaissa.etu.lmdsio.com/api/frais/visiteur/';

  private _reponses = new BehaviorSubject<Frais[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFrais: Frais[] = [];

  constructor(private http: HttpClient, private gsb_api: GsbLoginService) {}
  listeFraisDuVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Frais[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/visiteur/1"// + this.gsb_api.visiteurId()
      , { headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
        console.log("Appel API liste Frais reussi")
      },
      error => console.log("Erreur Appel API liste frais")
    )
  }
}
