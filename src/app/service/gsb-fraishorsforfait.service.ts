import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Fraishorsforfait} from "../metier/fraishorsforfait";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GsbLoginService} from "./gsb-login.service";

@Injectable({
  providedIn: 'root'
})
export class GsbFraishorsforfaitService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

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
    return this.http.get<Fraishorsforfait[]>(`${this.Url}/fraishorsforfait/` + id_frais, {headers: headers}).subscribe(
      data => {
        this.listeFraisHF = data;
        this._reponses.next(this.listeFraisHF);
        console.log("Appel API liste Frais Hors Forfait reussi")
      },
      error => {
        console.log("Erreur Appel API liste frais Hors Forfait", error)
      }
    )
  }

  updateFraisHorsForfait(id_fraishorsforfait: number,id_frais: number, date: string, montant_fraishorsforfait: number, lib_fraishorsforfait: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_fraishorsforfait": id_fraishorsforfait,
      "id_frais": id_frais,
      "date_fraishorsforfait": date,
      "montant_fraishorsforfait": montant_fraishorsforfait,
      "lib_fraishorsforfait": lib_fraishorsforfait,
    };
    this.http.put<Fraishorsforfait>(`${this.Url}/fraishorsforfait/updateFraisHorsForfait/${id_fraishorsforfait}`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.fraisHorsForfait = new Fraishorsforfait(data);
          this.dataStore.fraisHorsForfait.push(this.fraisHorsForfait);
          this._reponses.next(this.dataStore.fraisHorsForfait);
          this.router.navigate(['fraisHF/liste', id_frais]);
          console.log("Appel réussi");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  ajoutFraisHorsForfait(id_frais: number, date_fraishorsforfait: string, montant_fraishorsforfait: number, lib_fraishorsforfait: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "id_frais": id_frais,
      "date_fraishorsforfait": date_fraishorsforfait,
      "montant_fraishorsforfait": montant_fraishorsforfait,
      "lib_fraishorsforfait": lib_fraishorsforfait
    };

    this.http.post<Fraishorsforfait>(`${this.Url}/fraishorsforfait/ajoutFraisHorsForfait`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.fraisHorsForfait = new Fraishorsforfait(data);
          this.dataStore.fraisHorsForfait.push(this.fraisHorsForfait);
          this._reponses.next(this.dataStore.fraisHorsForfait);
          this.router.navigate(['fraisHF/liste', id_frais]);
          console.log("Appel réussi");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  deleteFraisHorsForfait(id_fraishorsforfait: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/fraishorsforfait/deleteFraisHorsForfait/${id_fraishorsforfait}`;

    return this.http.delete<void>(url, {headers: headers});
  }

  chargeFraisHorsForfait(id_fraishorsforfait: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/fraishorsforfait/getUnFraisHorsForfait/${id_fraishorsforfait}`;

    return this.http.get<Fraishorsforfait>(url, {headers: headers});
  }
}
