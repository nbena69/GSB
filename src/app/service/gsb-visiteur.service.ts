import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Visiteur} from "../metier/visiteur";

@Injectable({
  providedIn: 'root'
})
export class GsbVisiteurService {
  private localUrl = 'http://localhost/benaissa/GsbFrais/public/api';
  private httpUrl = "http://gsb.benaissa.etu.lmdsio.com/api";

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  chargeVisiteur(id_visiteur: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    return this.http.get<Visiteur>(`${this.localUrl}/visiteur/${id_visiteur}`, {headers: headers});
  //    return this.http.get<Visiteur>(`${this.httpUrl}/visiteur/${id_visiteur}`, {headers: headers});
  }
}
