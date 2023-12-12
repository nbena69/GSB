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
  private _reponses = new BehaviorSubject<Login[]>([]);
  private dataStore: { login: Login[] } = {login: []};
  readonly appels_termines = this._reponses.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Login({"email": email, "password": password});

    return this.http.post<Login>('http://localhost/benaissa/GsbFrais/public/api/login', requestObject).subscribe(
    //return this.http.post<Login>('http://gsb.benaissa.etu.lmdsio.com/api/login', requestObject).subscribe(
      data => {
        this.dataStore.login.push(new Login(data));
        this._reponses.next(this.dataStore.login);
        this.router.navigate(['frais/liste']);
      },
      error => console.log("Erreur Appel API")
    );
  }
}
/*export class GsbLoginService {
  private login: Login = new Login;
  constructor(private http: HttpClient, private router: Router) { }

  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Visiteur({"email": email, "password": password});

    return this.http.post<Login>('http://gsb.benaissa.etu.lmdsio.fr/api/login', requestObject).subscribe(
      data => {
        this.login = new Login(data);
        this.router.navigate(['/frais/liste']);
      },
      error => console.log("Erreur Appel API")
    );
  }
}
*/
