import { Injectable } from '@angular/core';
import {Login} from "../metier/login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GsbLoginService {

  private login: Login = new Login;
  public _reponses = new BehaviorSubject<Login[]>([]);
  public dataStore: { login: Login[] } = {login: []};
  readonly appels_termines = this._reponses.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Visiteur({ "login": email, "password": password });

    //return this.http.post<Login>('http://localhost/benaissa/GsbFrais/public/api/login', requestObject).subscribe(
    return this.http.post<Login>('http://gsb.benaissa.etu.lmdsio.com/api/login', requestObject).subscribe(
      data => {
        this.login = new Login(data);
        this.dataStore.login.push(this.login);
        this._reponses.next(this.dataStore.login);
        this.router.navigate(['frais/liste']);
        console.log("Appel réussi");
      },
      error => {
        console.log("Erreur Appel API", error);
      }
    );
  }

  recupereBearer(): string {
    return this.login.access_token;
  }
  visiteurId(): number {
    return this.login.visiteur.id_visiteur;
  }

  logout() {
    // Réinitialiser les données de connexion
    this.login = new Login();
    this.dataStore.login = [];
    this._reponses.next(this.dataStore.login);

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
