import {Component} from '@angular/core';
import {MenuComponent} from "../../../all/menu/menu.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {GsbFraisService} from "../../../../service/service-gsb/classic/gsb-frais.service";
import {GsbShortService} from "../../../../service/service-gsb/gsb-short.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardTitle} from "@angular/material/card";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-ajout-frais',
  standalone: true,
  imports: [
    MenuComponent, ReactiveFormsModule, CommonModule, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle, ErrorMessageComponent
  ],
  templateUrl: './ajout-frais.component.html',
  styleUrl: './ajout-frais.component.css'
})

export class AjoutFraisComponent {
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');
  id_etat: FormControl = new FormControl(2);
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, route: ActivatedRoute, private frais_api: GsbFraisService, private etat_api: GsbShortService) {
    this.etat_api.getListeEtats();
  }

  getListeEtat() {
    return this.etat_api.appels_terminesEtat;
  }

  onSubmitAjoutFrais() {
    const anneemois = this.anneemois.value;
    const nbjustificatifs = this.nbjustificatifs.value;
    const montantvalide = this.montantvalide.value;
    const id_etat = this.id_etat.value;

    if (!anneemois || !nbjustificatifs || !montantvalide || !id_etat) {
      this.errorMessage = "Tous les champs doivent être remplis.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);return;
    }

    const regexAnneemois = /^\d{4}-\d{2}$/;
    if (!regexAnneemois.test(anneemois)) {
      this.errorMessage = "Le format de 'anneemois' est incorrect. Le format attendu est 'AAAA-MM'.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);return;
    }

    this.frais_api.ajoutFrais(anneemois, nbjustificatifs, montantvalide, id_etat);
  }

  return() {
    this.all_service.return();
  }
}
