import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbShortService} from "../../service/gsb-short.service";
import {AsyncPipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-update-visiteur-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions
  ],
  templateUrl: './update-visiteur-popup.component.html',
  styleUrl: './update-visiteur-popup.component.css'
})
export class UpdateVisiteurPopupComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  repetPassword: FormControl = new FormControl('');
  id_laboratoire: FormControl = new FormControl("");
  id_secteur: FormControl = new FormControl("");
  nom_visiteur: FormControl = new FormControl('');
  prenom_visiteur: FormControl = new FormControl('');
  adresse_visiteur: FormControl = new FormControl('');
  cp_visiteur: FormControl = new FormControl('');
  ville_visiteur: FormControl = new FormControl('');
  date_embauche: FormControl = new FormControl('');
  type_visiteur: FormControl = new FormControl('');
  constructor(public dialogRef: MatDialogRef<UpdateVisiteurPopupComponent>, private shortService: GsbShortService) {
    this.shortService.getListeSecteur();
    this.shortService.getListeLaboratoire();
  }

  getListeSecteur() {
    return this.shortService.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.shortService.appels_terminesLaboratoire;
  }

  onSubmit() {

  }

  closePopup() {
    this.dialogRef.close();
  }
}
