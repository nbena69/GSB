import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatAutocompleteModule, MatOption} from "@angular/material/autocomplete";
import {MatCardTitle} from "@angular/material/card";
import {ErrorMessageComponent} from "../../composant/all/error-message/error-message.component";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {GsbShortService} from "../../service/gsb-short.service";

@Component({
  selector: 'app-recontact-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    ErrorMessageComponent, MatFormFieldModule, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle, MatAutocompleteModule
  ],
  templateUrl: './recontact-popup.component.html',
  styleUrl: './recontact-popup.component.css'
})

export class RecontactPopupComponent {
  nom: FormControl = new FormControl("");
  prenom: FormControl = new FormControl("");
  codePostal: FormControl = new FormControl("");
  telephone: FormControl = new FormControl("");
  specialite: FormControl = new FormControl("");
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  objetDemande: FormControl = new FormControl("");
  errorMessage = '';

  constructor(private shortService: GsbShortService) {
    this.shortService.getListeSpecialite();
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Veuillez saisir une adresse email\n';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Veuillez saisir une adresse email valide\n';
    } else {
      this.errorMessage = '';
    }
  }

  getListeSpecialite() {
    return this.shortService.appels_terminesSpecialite;
  }
}
