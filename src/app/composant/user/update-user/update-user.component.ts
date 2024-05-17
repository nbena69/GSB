import {Component} from '@angular/core';
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
import {Visiteur} from "../../../metier/api-gsb/visiteur";
import {GsbVisiteurService} from "../../../service/service-gsb/gsb-visiteur.service";
import {
  UpdateAffectationPopupComponent
} from "../../pop-up/update-affectation-popup/update-affectation-popup.component";
import {ErrorMessagePopupComponent} from "../../pop-up/event/error-message-popup/error-message-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatDatepickerModule, ErrorMessageComponent, MatList, MatListItem],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  public id_visiteur: number = 0;
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

  constructor(public dialog: MatDialog, private all_service: GsbAllService, private loginService: GsbAuthService, private secteur_api: GsbShortService, private laboratoire_api: GsbShortService, private banService: BanService, private visiteurService: GsbVisiteurService) {
    this.secteur_api.getListeSecteur();
    this.laboratoire_api.getListeLaboratoire();
    this.id_visiteur = this.loginService.visiteurId();
    this.visiteurService.chargeVisiteur(this.id_visiteur).subscribe(
      dataVisiteur => {
        let visiteur = new Visiteur(dataVisiteur);
        this.id_laboratoire.setValue(visiteur.id_laboratoire);
        this.id_secteur.setValue(visiteur.id_secteur);
        this.nom_visiteur.setValue(visiteur.nom_visiteur);
        this.prenom_visiteur.setValue(visiteur.prenom_visiteur);
        this.adresse_visiteur.setValue(visiteur.adresse_visiteur);
        this.cp_visiteur.setValue(visiteur.cp_visiteur);
        this.ville_visiteur.setValue(visiteur.ville_visiteur);
      },
      error => console.log('Erreur Appel API')
    );
    this.addressSubscription = this.adresse_visiteur.valueChanges.subscribe(value => {
      this.banService.searchAddress(value).subscribe(addresses => {
      });
    });
    this.nom_visiteur.disable();
    this.prenom_visiteur.disable();
  }

  openErrorMessage(errorMessage: string) {
    this.dialog.open(ErrorMessagePopupComponent, {
      height: '55%',
      width: '30%',
      data: { errorMessage: errorMessage }
    });
  }

  onSubmitUpdateVisiteur() {
    this.visiteurService.updateVisiteur(
      this.id_visiteur.valueOf(),
      this.adresse_visiteur.value,
      this.cp_visiteur.value,
      this.ville_visiteur.value,
      this.id_laboratoire.value,
      this.id_secteur.value
    );
  }

  onSubmitUpdatePassword() {
    if (this.password.value === this.repetPassword.value) {
      this.visiteurService.updatePwdVisiteur(
        this.id_visiteur.valueOf(),
        this.actuallyPassword.value,
        this.password.value
      );
    } else {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      this.openErrorMessage(this.errorMessage)
      console.log("Les mots de passe ne correspondent pas.");
    }
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
