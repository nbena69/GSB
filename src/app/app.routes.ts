import { Routes } from '@angular/router';
import {LoginComponent} from "./composant/login/login.component";
import {ListeFraisComponent} from "./composant/frais/liste-frais/liste-frais.component";
import {HomeComponent} from "./composant/home/home.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'frais/liste', component: ListeFraisComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];
