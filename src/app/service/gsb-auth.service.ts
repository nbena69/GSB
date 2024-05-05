import {Injectable} from '@angular/core';
import {Login} from "../metier/login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {GsbAllService} from "./gsb-all.service";

@Injectable({
  providedIn: 'root'
})

export class GsbAuthService {
  private Url = 'https://gsbcore.naelbenaissa.fr/api';

  public utilisateurConnecte: boolean = false;
  private _authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  auth$ = this._authSubject.asObservable();

  private login: Login = new Login;
  public _reponses = new BehaviorSubject<Login[]>([]);
  public dataStore: { login: Login[] } = {login: []};
  readonly appels_termines = this._reponses.asObservable();

  private envoieRegister: boolean = false;
  private register: Visiteur = new Visiteur;
  public _reponsesRegister = new BehaviorSubject<Visiteur[]>([]);
  public dataStoreRegister: { register: Visiteur[] } = {register: []};
  readonly appels_terminesRegister = this._reponsesRegister.asObservable();

  constructor(private http: HttpClient, private router: Router, private all_service: GsbAllService) {
  }

  serviceEnvoieLogin(email: string, password: string): Observable<any> {
    const requestObject = new Visiteur({"login": email, "password": password});

    return this.http.post<Login>(`${this.Url}/login`, requestObject).pipe(
      tap(data => {
        this.login = new Login(data);
        this.dataStore.login.push(this.login);
        this._reponses.next(this.dataStore.login);
        this.utilisateurConnecte = true;
        this.router.navigate(['']);
      }),
      catchError(error => {
        console.log("Erreur Appel API", error);
        return throwError(error);
      })
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

          this.serviceEnvoieLogin(email, password).subscribe(
            () => {
            },
            error => {
              console.log("Erreur lors de la connexion automatique après l'inscription", error);
            }
          );
        },
        error => {
          console.log("Erreur lors de la création du visiteur", error);
        }
      );
  }

  recupereBearer(): string {
    return this.login.access_token;
  }

  visiteurType(): string {
    return this.login.visiteur.type_visiteur;
  }

  visiteurNom(): string {
    return this.login.visiteur.nom_visiteur;
  }

  visiteurId(): number {
    return this.login.visiteur.id_visiteur;
  }

  estConnecte(): boolean {
    return this.utilisateurConnecte;
  }

  get auth(): boolean {
    return this._authSubject.value;
  }

  authLogin() {
    this._authSubject.next(true);
  }

  authRegister() {
    this._authSubject.next(false);
  }

  logout() {
    this.login = new Login();
    this.dataStore.login = [];
    this._reponses.next(this.dataStore.login);

    this.utilisateurConnecte = false;
    this.router.navigate(['/login-facade']);
  }
}
