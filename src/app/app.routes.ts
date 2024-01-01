import {CanActivateFn, Router, Routes} from '@angular/router';
import {LoginComponent} from "./composant/cnx/login/login.component";
import {ListeFraisComponent} from "./composant/frais/liste-frais/liste-frais.component";
import {HomeComponent} from "./composant/home/home.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {inject} from "@angular/core";
import {AfficheFraisComponent} from "./composant/frais/affiche-frais/affiche-frais.component";
import {AjoutFraisComponent} from "./composant/frais/ajout-frais/ajout-frais.component";
import {RegisterComponent} from "./composant/cnx/register/register.component";
import {ListeFraishorsforfaitComponent} from "./composant/fraishorsforfait/liste-fraishorsforfait/liste-fraishorsforfait.component";
import {AfficheFraishorsforfaitComponent} from "./composant/fraishorsforfait/affiche-fraishorsforfait/affiche-fraishorsforfait.component";
import {AjoutFraishorsforfaitComponent} from "./composant/fraishorsforfait/ajout-fraishorsforfait/ajout-fraishorsforfait.component";
import {DashboardUserComponent} from "./composant/user/dashboard-user/dashboard-user.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardUserComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste/:id_frais', component: AfficheFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/ajout', component: AjoutFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'fraisHF/liste/:id_frais', component: ListeFraishorsforfaitComponent, canActivate: [authentificationGuard()]},
  {path: 'fraisHF/affiche/:id_fraishorsforfait', component: AfficheFraishorsforfaitComponent, canActivate: [authentificationGuard()]},
  {path: 'fraisHF/ajout/:id_frais', component: AjoutFraishorsforfaitComponent, canActivate: [authentificationGuard()]},
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
