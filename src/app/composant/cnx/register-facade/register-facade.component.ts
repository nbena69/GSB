import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbAuthService} from "../../../service/service-gsb/gsb-auth.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GsbShortService} from "../../../service/service-gsb/gsb-short.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {GsbAllService} from "../../../service/gsb-all.service";
import {Subscription} from "rxjs";
import {BanService} from "../../../service/service-ban/ban.service";
import {Adresse} from "../../../metier/api-ban/adresse";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-register-facade',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatDatepickerModule, ErrorMessageComponent, MatList, MatListItem],
  templateUrl: './register-facade.component.html',
  styleUrl: './register-facade.component.css'
})

export class RegisterFacadeComponent {
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
  addressSubscription: Subscription;
  actuallyStep: number = 1;
  hide = true;
  repeatHide = true;
  errorMessage: string | null = null;
  adresses: Adresse[] = [];

  constructor(private all_service: GsbAllService, private loginService: GsbAuthService, private secteur_api: GsbShortService, private laboratoire_api: GsbShortService, private banService: BanService) {
    this.secteur_api.getListeSecteur();
    this.laboratoire_api.getListeLaboratoire();
    this.addressSubscription = this.adresse_visiteur.valueChanges.subscribe(value => {
      this.banService.searchAddress(value).subscribe(addresses => {
      });
    });
  }

  searchAddress() {
    const query = this.adresse_visiteur.value;
    if (query) {
      this.banService.searchAddress(query).subscribe((addresses: Adresse[]) => {
        this.adresses = addresses;
      });
    } else {
      this.adresses = [];
    }
  }

  selectAddress(address: Adresse) {
    this.adresse_visiteur.setValue(address.name);
    this.cp_visiteur.setValue(address.postcode);
    this.ville_visiteur.setValue(address.city);
    this.adresses = [];
  }

  onSubmitAjoutVisiteur() {
    if (this.password.value === this.repetPassword.value) {
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
    } else {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      this.actualiseValue();
      this.actuallyStep = 1;
    }
  }

  return() {
    this.all_service.return();
  }

  getListeSecteur() {
    return this.secteur_api.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.laboratoire_api.appels_terminesLaboratoire;
  }

  validateNumberInput(event: KeyboardEvent) {
    // Récupérer le caractère entré
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    // Vérifier si le caractère est un chiffre
    if (!/^\d+$/.test(charStr)) {
      // Si ce n'est pas un chiffre, empêcher l'entrée
      event.preventDefault();
    }
  }

  authLogin() {
    this.loginService.authLogin();
  }

  actualiseValue() {
    this.password.setValue("");
    this.repetPassword.setValue("");
  }
}
