import {CanActivateFn, Router, Routes} from '@angular/router';
import {LoginComponent} from "./composant/login/login.component";
import {ListeFraisComponent} from "./composant/frais/liste-frais/liste-frais.component";
import {HomeComponent} from "./composant/home/home.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {inject} from "@angular/core";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];


export function authentificationGuard(): CanActivateFn{
  return() => {
    const loginService: GsbLoginService = inject(GsbLoginService);

    if(loginService.visiteurId() > 0) {
      return true;
    } else {
      console.log("Il faut vous connecter !");
      return false;
    }
  };
}
