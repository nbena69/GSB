import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbShortService} from "../../service/gsb-short.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {GsbVisiteurService} from "../../service/gsb-visiteur.service";
import {InfosVisiteur} from "../../metier/infos-visiteur";
import {ErrorMessageComponent} from "../../composant/all/error-message/error-message.component";

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
    ErrorMessageComponent
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
  id_visiteur: number;
  errorMessage: string | null = null;

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
        this.id_region.setValue(infosVisiteur.id_region);
        this.id_laboratoire.setValue(infosVisiteur.id_laboratoire);
        this.id_laboratoire.disable();
        this.nom_visiteur.disable();
        this.prenom_visiteur.disable();
        this.id_secteur.setValue(infosVisiteur.id_secteur);
      },
      error => {
        this.errorMessage = "Une erreur s'est produite : " + error.error.error;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    );
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

  closePopup() {
    this.dialogRef.close();
  }
}
