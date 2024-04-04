import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbShortService} from "../../../service/gsb-short.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {GsbVisiteurService} from "../../../service/gsb-visiteur.service";
import {InfosVisiteur} from "../../../metier/infos-visiteur";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-update-visiteur-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    ErrorMessageComponent,
    MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle
  ],
  templateUrl: './update-visiteur-popup.component.html',
  styleUrl: './update-visiteur-popup.component.css'
})

export class UpdateVisiteurPopupComponent {
  id_laboratoire: FormControl = new FormControl("");
  id_region: FormControl = new FormControl("");
  id_secteur: FormControl = new FormControl("");
  nom_visiteur: FormControl = new FormControl('');
  prenom_visiteur: FormControl = new FormControl('');
  affectations: FormControl = new FormControl();
  id_visiteur: number;
  errorMessage: string | null = null;
  valuePage: number = 1;
  boolPage: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateVisiteurPopupComponent>, private shortService: GsbShortService, private visiteurService: GsbVisiteurService) {
    this.shortService.getListeSecteur();
    this.shortService.getListeLaboratoire();
    this.shortService.getListeRegion();
    this.id_visiteur = this.data.id_visiteur;
    this.visiteurService.obtenirInfosVisiteur(this.id_visiteur).subscribe(
      data => {
        let infosVisiteur = new InfosVisiteur(data);
        this.nom_visiteur.setValue(infosVisiteur.nom_visiteur);
        this.prenom_visiteur.setValue(infosVisiteur.prenom_visiteur);
        this.id_laboratoire.setValue(infosVisiteur.id_laboratoire);
        this.affectations.setValue(infosVisiteur.regions);
        this.id_laboratoire.disable();
        this.nom_visiteur.disable();
        this.prenom_visiteur.disable();
      },
      error => {
        this.errorMessage = "Une erreur s'est produite : " + error.error.error;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    );
  }

  getListeAffectation() {
    return this.affectations.value;
  }

  getListeSecteur() {
    return this.shortService.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.shortService.appels_terminesLaboratoire;
  }

  getListeRegion() {
    return this.shortService.appels_terminesRegion;
  }

  onSubmit() {

  }
}
