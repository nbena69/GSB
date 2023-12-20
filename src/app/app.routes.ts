import {CanActivateFn, Router, Routes} from '@angular/router';
import {LoginComponent} from "./composant/cnx/login/login.component";
import {ListeFraisComponent} from "./composant/frais/liste-frais/liste-frais.component";
import {HomeComponent} from "./composant/home/home.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {inject} from "@angular/core";
import {AfficheFraisComponent} from "./composant/frais/affiche-frais/affiche-frais.component";
import {AjoutFraisComponent} from "./composant/frais/ajout-frais/ajout-frais.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'frais/liste/:id_frais', component: AfficheFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/ajout', component: AjoutFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

export function authentificationGuard(): CanActivateFn {
  return () => {
    const loginService: GsbLoginService = inject(GsbLoginService);

    if (loginService.visiteurId() > 0) {
      return true;
    } else {
      console.log("Il faut vous connecter !");
      return false;
    }
  };
}
