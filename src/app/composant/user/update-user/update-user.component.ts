import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {Adresse} from "../../../metier/api-ban/adresse";
import {GsbAllService} from "../../../service/gsb-all.service";
import {GsbAuthService} from "../../../service/service-gsb/gsb-auth.service";
import {GsbShortService} from "../../../service/service-gsb/gsb-short.service";
import {BanService} from "../../../service/service-ban/ban.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatDatepickerModule, ErrorMessageComponent, MatList, MatListItem],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  nom_visiteur: FormControl = new FormControl('');
  prenom_visiteur: FormControl = new FormControl('');
  id_laboratoire: FormControl = new FormControl(1);
  id_secteur: FormControl = new FormControl(1);
  adresse_visiteur: FormControl = new FormControl('');
  cp_visiteur: FormControl = new FormControl('');
  ville_visiteur: FormControl = new FormControl('');
  actuallyPassword: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  repetPassword: FormControl = new FormControl('');
  actuallyHide = true;
  hide = true;
  repeatHide = true;
  addressSubscription: Subscription;
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

  onSubmitUpdateVisiteur() {

  }

  onSubmitUpdatePassword() {

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
}
