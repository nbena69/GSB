import {Injectable} from '@angular/core';
import {Login} from "../metier/login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GsbAuthService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  public utilisateurConnecte: boolean = false;

  private login: Login = new Login;
  public _reponses = new BehaviorSubject<Login[]>([]);
  public dataStore: { login: Login[] } = {login: []};
  readonly appels_termines = this._reponses.asObservable();

  private envoieRegister: boolean = false;
  private register: Visiteur = new Visiteur;
  public _reponsesRegister = new BehaviorSubject<Visiteur[]>([]);
  public dataStoreRegister: { register: Visiteur[] } = {register: []};
  readonly appels_terminesRegister = this._reponsesRegister.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Visiteur({"login": email, "password": password});

    return this.http.post<Login>(`${this.Url}/login`, requestObject).subscribe(
      data => {
        this.login = new Login(data);
        this.dataStore.login.push(this.login);
        this._reponses.next(this.dataStore.login);
        this.utilisateurConnecte = true;
        this.router.navigate(['']);
      },
      error => {
        console.log("Erreur Appel API", error);
      }
    );
  }

  ajoutRegister(email: string, password: string, id_laboratoire: string, id_secteur: string, nom_visiteur: string,
                prenom_visiteur: string, adresse_visiteur: string, cp_visiteur: string, ville_visiteur: string,
                date_embauche: string, type_visiteur: string) {
    const requestObject = {
      "id_laboratoire": id_laboratoire,
      "id_secteur": id_secteur,
      "nom_visiteur": nom_visiteur,
      "prenom_visiteur": prenom_visiteur,
      "adresse_visiteur": adresse_visiteur,
      "cp_visiteur": cp_visiteur,
      "ville_visiteur": ville_visiteur,
      "date_embauche": date_embauche,
      "login_visiteur": email,
      "pwd_visiteur": password,
      "type_visiteur": type_visiteur,
    };

    this.http.post<Visiteur>(`${this.Url}/ajoutVisiteur`, requestObject)
      .subscribe(
        data => {
          this.register = new Visiteur(data);
          this.dataStoreRegister.register.push(this.register);
          this._reponsesRegister.next(this.dataStoreRegister.register);
          this.serviceEnvoieLogin(email, password);
          this.router.navigate(['/']);
          console.log("Ajout de visiteur réussi", data);
        },
        error => {
          console.log("Erreur lors de l'ajout de visiteur", error);
        }
      );
  }

  recupereBearer(): string {
    return this.login.access_token;
  }

  visiteurId(): number {
    return this.login.visiteur.id_visiteur;
  }

  estConnecte(): boolean {
    return this.utilisateurConnecte;
  }

  logout() {
    this.login = new Login();
    this.dataStore.login = [];
    this._reponses.next(this.dataStore.login);

    this.utilisateurConnecte = false;
    this.router.navigate(['/login-facade']);
  }
}
