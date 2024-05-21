import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Frais} from '../../../metier/api-gsb/frais';
import {GsbAuthService} from "../gsb-auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GsbFraisService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  private frais: Frais = new Frais;
  private _reponses = new BehaviorSubject<Frais[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFrais: Frais[] = [];
  public dataStore: { frais: Frais[] } = {frais: []};

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbAuthService) {
  }

  getListeFrais() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Frais[]>(`${this.Url}/frais`, {headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
      },
      error => {
        console.log("Erreur Appel API Frais", error)
      }
    )
  }

  listeFraisDuVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    return this.http.get<Frais[]>(`${this.Url}/frais/visiteur/` + this.gsb_api.visiteurId(), {headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
      },
      error => {
        console.log("Erreur Appel API Frais", error)
      }
    )
  }

  updateFrais(id_frais: number, anneemois: string, nbjustificatifs: number, montantvalide: number, id_etat: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const requestObject = {
      "id_frais": id_frais,
      "nbjustificatifs": nbjustificatifs,
      "montantvalide": montantvalide,
      "anneemois": anneemois,
      "id_etat": id_etat,
      "id_visiteur": this.gsb_api.visiteurId(),
      "datemodification": formattedDate
    };
    this.http.put<Frais>(`${this.Url}/frais/updateFrais/${id_frais}`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.frais = new Frais(data);
          this.dataStore.frais.push(this.frais);
          this._reponses.next(this.dataStore.frais);
          this.router.navigate(['frais/liste']);
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  ajoutFrais(anneemois: string, nbjustificatifs: number, montantvalide: number, id_etat: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const requestObject = {
      "nbjustificatifs": nbjustificatifs,
      "montantvalide": montantvalide,
      "anneemois": anneemois,
      "id_etat": id_etat,
      "id_visiteur": this.gsb_api.visiteurId(),
      "datemodification": formattedDate
    };
    this.http.post<Frais>(`${this.Url}/frais/ajoutFrais`, requestObject, {headers: headers})
      .subscribe(
        data => {
          this.frais = new Frais(data);
          this.dataStore.frais.push(this.frais);
          this._reponses.next(this.dataStore.frais);
          this.router.navigate(['frais/liste']);
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  deleteFrais(id_frais: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/frais/deleteFrais/${id_frais}`;

    return this.http.delete<void>(url, {headers: headers});
  }

  chargeFrais(id_frais: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupereBearer()
    });
    const url = `${this.Url}/frais/getUnFrais/${id_frais}`;

    return this.http.get<Frais>(url, {headers: headers});
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
