import {CanActivateFn, Routes} from '@angular/router';
import {ListeFraisComponent} from "./composant/classic/frais/liste-frais/liste-frais.component";
import {HomeComponent} from "./composant/home/home.component";
import {GsbAuthService} from "./service/gsb-auth.service";
import {inject} from "@angular/core";
import {AfficheFraisComponent} from "./composant/classic/frais/affiche-frais/affiche-frais.component";
import {AjoutFraisComponent} from "./composant/classic/frais/ajout-frais/ajout-frais.component";
import {ListeFraishorsforfaitComponent} from "./composant/classic/fraishorsforfait/liste-fraishorsforfait/liste-fraishorsforfait.component";
import {AfficheFraishorsforfaitComponent} from "./composant/classic/fraishorsforfait/affiche-fraishorsforfait/affiche-fraishorsforfait.component";
import {AjoutFraishorsforfaitComponent} from "./composant/classic/fraishorsforfait/ajout-fraishorsforfait/ajout-fraishorsforfait.component";
import {DashboardUserComponent} from "./composant/user/dashboard-user/dashboard-user.component";
import {AccountSectionComponent} from "./composant/user/sections/account-section/account-section.component";
import {NotificationSectionComponent} from "./composant/user/sections/notification-section/notification-section.component";
import {ContactSectionComponent} from "./composant/user/sections/contact-section/contact-section.component";
import {SearchVisiteurComponent} from "./composant/user/search-visiteur/search-visiteur.component";
import {ListeActiviteComponent} from "./composant/classic/activite/liste-activite/liste-activite.component";
import {AjoutActiviteComponent} from "./composant/classic/activite/ajout-activite/ajout-activite.component";
import {AuthComponent} from "./composant/cnx/auth/auth.component";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardUserComponent, canActivate: [authentificationGuard()]},

  {path: 'frais/liste/:id_frais', component: AfficheFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/ajout', component: AjoutFraisComponent, canActivate: [authentificationGuard()]},

  {path: 'activite/liste', component: ListeActiviteComponent, canActivate: [authentificationGuard()]},
  {path: 'activite/ajout', component: AjoutActiviteComponent, canActivate: [authentificationGuard()]},

  {path: 'fraisHF/liste/:id_frais', component: ListeFraishorsforfaitComponent, canActivate: [authentificationGuard()]},
  {path: 'fraisHF/affiche/:id_fraishorsforfait', component: AfficheFraishorsforfaitComponent, canActivate: [authentificationGuard()]},
  {path: 'fraisHF/ajout/:id_frais', component: AjoutFraishorsforfaitComponent, canActivate: [authentificationGuard()]},

  {path: 'searchVisiteur', component: SearchVisiteurComponent, canActivate: [authentificationGuard()]},

  {path: 'dashboard/account', component: AccountSectionComponent, canActivate: [authentificationGuard()]},
  {path: 'dashboard/notif', component: NotificationSectionComponent, canActivate: [authentificationGuard()]},
  {path: 'dashboard/contact', component: ContactSectionComponent, canActivate: [authentificationGuard()]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

export function authentificationGuard(): CanActivateFn {
  return () => {
    const loginService: GsbAuthService = inject(GsbAuthService);

    if (loginService.visiteurId() > 0) {
      return true;
    } else {
      console.log("Il faut vous connecter !");
      return false;
    }
  };
}
