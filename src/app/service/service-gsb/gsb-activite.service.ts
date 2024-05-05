import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActiviteCompl} from "../../metier/api-gsb/activite-compl";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbAuthService} from "./gsb-auth.service";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient, private gsb_api: GsbAuthService, private router: Router) { }

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

  ajoutActivite(date_activite: string, lieu_activite: number, theme_activite: number, motif_activite: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const requestObject = {
      "date_activite": date_activite,
      "lieu_activite": lieu_activite,
      "theme_activite": theme_activite,
      "motif_activite": motif_activite,
      "id_visiteur": this.gsb_api.visiteurId(),
      "type_visiteur" : this.gsb_api.visiteurType()
    };
    this.http.post<ActiviteCompl>(`${this.Url}/activite/ajoutActivite`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.activite = new ActiviteCompl(data);
          this.dataStore.activite.push(this.activite);
          this._reponses.next(this.dataStore.activite);
          this.router.navigate(['activite/liste']);
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  deleteActivite(id_activite: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/activite/deleteActivite/${id_activite}`;

    return this.http.delete<void>(url, {headers: headers});
  }
}
