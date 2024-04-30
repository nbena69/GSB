import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ActiviteCompl} from "../metier/activite-compl";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbAuthService} from "./gsb-auth.service";
import {Frais} from "../metier/frais";

@Injectable({
  providedIn: 'root'
})

export class GsbActiviteService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  private activite: ActiviteCompl = new ActiviteCompl;
  private _reponses = new BehaviorSubject<ActiviteCompl[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeActivite: ActiviteCompl[] = [];
  public dataStore: { activite: ActiviteCompl[] } = {activite: []};

  constructor(private http: HttpClient, private gsb_api: GsbAuthService) { }

  getListeActivite() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<ActiviteCompl[]>(`${this.Url}/activite`, {headers: headers}).subscribe(
      data => {
        this.listeActivite = data;
        this._reponses.next(this.listeActivite);
      },
      error => {
        console.log("Erreur Appel API Activite", error)
      }
    )
  }

  listeActiviteDuVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<ActiviteCompl[]>(`${this.Url}/activite/visiteur/` + this.gsb_api.visiteurId(), {headers: headers}).subscribe(
      data => {
        this.listeActivite = data;
        this._reponses.next(this.listeActivite);
      },
      error => {
        console.log("Erreur Appel API liste Activité", error)
      }
    )
  }
}
