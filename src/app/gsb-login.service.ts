import { Injectable } from '@angular/core';
import {Login} from "./login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Visiteur} from "./visiteur";

@Injectable({
  providedIn: 'root'
})
export class GsbLoginService {
  private login: Login = new Login;
  constructor(private http: HttpClient, private router: Router) { }

  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Visiteur({"email": email, "password": password});

    return this.http.post<Login>('http://localhost:8000/api/login', requestObject).subscribe(
      data => {
        this.login = new Login(data);
        this.router.navigate(['/frais/liste']);
      },
      error => console.log("Erreur Appel API")
    );
  }
}
