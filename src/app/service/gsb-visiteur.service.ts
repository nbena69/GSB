import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Visiteur} from "../metier/visiteur";

@Injectable({
  providedIn: 'root'
})
export class GsbVisiteurService {

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  chargeVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `http://localhost/benaissa/GsbFrais/public/api/visiteur/${id_visiteur}`;
    //const url = `http://gsb.benaissa.etu.lmdsio.com/api/visiteur/${id_visiteur}`;

    return this.http.get<Visiteur>(url, {headers: headers});
  }
}
