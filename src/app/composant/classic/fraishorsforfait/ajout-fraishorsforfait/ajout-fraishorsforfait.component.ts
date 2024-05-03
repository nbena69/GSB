import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../../service/gsb-fraishorsforfait.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../../all/menu/menu.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";

@Component({
  selector: 'app-ajout-fraishorsforfait',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, CommonModule, MatInputModule, MatIcon, MatButtonModule, MatFormField, MatLabel, MatOption, MatDialogModule, MatCardTitle, MatDividerModule, ErrorMessageComponent
  ],
  templateUrl: './ajout-fraishorsforfait.component.html',
  styleUrl: './ajout-fraishorsforfait.component.css'
})

export class AjoutFraishorsforfaitComponent {
  public id_frais: number = 0;
  date_fraishorsforfait: FormControl = new FormControl('');
  montant_fraishorsforfait: FormControl = new FormControl('');
  lib_fraishorsforfait: FormControl = new FormControl('');
  errorMessage: string | null = null;

  constructor(private location: Location, route: ActivatedRoute, private fraishorsforfait_api: GsbFraishorsforfaitService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
  }

  onSubmitAjoutFraisHorsForfait() {
    const id_frais = this.id_frais;
    const dateFraishorsforfait = this.date_fraishorsforfait.value;
    const montantFraishorsforfait = this.montant_fraishorsforfait.value;
    const libFraishorsforfait = this.lib_fraishorsforfait.value;

    if (!dateFraishorsforfait || !montantFraishorsforfait || !libFraishorsforfait) {
      this.errorMessage = "Tous les champs doivent être remplis.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return;
    }

    const regexDateFraishorsforfait = /^\d{2}-\d{2}-\d{4}$/;
    if (!regexDateFraishorsforfait.test(dateFraishorsforfait)) {
      this.errorMessage = "Format de date incorrect. Le format attendu est 'jj-mm-aaaa'.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return;
    }

    this.fraishorsforfait_api.ajoutFraisHorsForfait(id_frais, dateFraishorsforfait, montantFraishorsforfait, libFraishorsforfait);
  }

  return() {
    this.location.back();
  }
}
