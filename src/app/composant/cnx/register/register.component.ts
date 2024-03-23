import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbLoginService} from "../../../service/gsb-login.service";
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GsbShortService} from "../../../service/gsb-short.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatDatepickerModule],
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
  type_visiteur: FormControl = new FormControl('V');
  actuallyStep: number = 1;
  hide = true;

  constructor(private loginService: GsbLoginService, private location: Location, private secteur_api: GsbShortService, private laboratoire_api: GsbShortService) {
    this.secteur_api.getListeSecteur();
    this.laboratoire_api.getListeLaboratoire();
  }

  onSubmitAjoutVisiteur() {
    this.loginService.ajoutRegister(
      this.email.value,
      this.password.value,
      this.id_laboratoire.value,
      this.id_secteur.value,
      this.nom_visiteur.value,
      this.prenom_visiteur.value,
      this.adresse_visiteur.value,
      this.cp_visiteur.value,
      this.ville_visiteur.value,
      this.date_embauche.value,
      this.type_visiteur.value
    );
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
