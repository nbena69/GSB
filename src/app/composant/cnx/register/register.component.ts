import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbLoginService} from "../../../service/gsb-login.service";
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GsbShortService} from "../../../service/gsb-short.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  repetPassword: FormControl = new FormControl('');
  id_laboratoire: FormControl = new FormControl(1);
  id_secteur: FormControl = new FormControl(1);
  nom_visiteur: FormControl = new FormControl('');
  prenom_visiteur: FormControl = new FormControl('');
  adresse_visiteur: FormControl = new FormControl('');
  cp_visiteur: FormControl = new FormControl('');
  ville_visiteur: FormControl = new FormControl('');
  date_embauche: FormControl = new FormControl('');
  type_visiteur: FormControl = new FormControl('');


  showPassword: boolean = false;
  showText: boolean = false;
  actuallyStep: number = 1;

  constructor(private loginService: GsbLoginService, private location: Location, private secteur_api: GsbShortService, private laboratoire_api: GsbShortService) {
    this.secteur_api.getListeSecteur();
    this.laboratoire_api.getListeLaboratoire();
  }

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    );
  }

  voirMdp() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  return() {
    this.location.back();
  }

  getListeSecteur() {
    return this.secteur_api.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.laboratoire_api.appels_terminesLaboratoire;
  }
}
