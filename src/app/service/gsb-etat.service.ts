import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Frais} from "../metier/frais";

@Injectable({
  providedIn: 'root'
})

export class GsbEtatService {
  private etat: Etat = new Etat;
  private _reponsesEtat = new BehaviorSubject<Etat[]>([]);
  readonly appels_terminesEtat = this._reponsesEtat.asObservable();
  public listeEtat: Etat[] = [];
  public dataStoreEtat: { etat: Frais[] } = {etat: []};

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Etat[]>("http://localhost/benaissa/GsbFrais/public/api/frais/etats"
      //return this.http.get<Etat[]>("http://gsb.benaissa.etu.lmdsio.com/api/frais/etats"
      , {headers: headers}).subscribe(
      data => {
        this.listeEtat = data;
        this._reponsesEtat.next(this.listeEtat);
        console.log("Appel API liste Etats reussi")
      },
      error => console.log("Erreur Appel API liste Etats")
    )
  }
}
