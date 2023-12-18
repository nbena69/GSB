import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";
import {Frais} from "../metier/frais";

@Injectable({
  providedIn: 'root'
})
export class GsbUserService {

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  chargeUser(id_user: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    // const url = `http://localhost/benaissa/GsbFrais/public/api/frais/getUnFrais/${id_user}`;
    const url = `http://gsb.benaissa.etu.lmdsio.com/api/frais/getUnFrais/${id_user}`;

    return this.http.get<Frais>(url, {headers: headers});
  }
}
