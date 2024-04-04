import {Component} from '@angular/core';
import {MenuComponent} from "../../../all/menu/menu.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GsbFraisService} from "../../../../service/gsb-frais.service";
import {GsbShortService} from "../../../../service/gsb-short.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-ajout-frais',
  standalone: true,
  imports: [
    MenuComponent, ReactiveFormsModule, CommonModule, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle
  ],
  templateUrl: './ajout-frais.component.html',
  styleUrl: './ajout-frais.component.css'
})

export class AjoutFraisComponent {
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');
  id_etat: FormControl = new FormControl(2);

  constructor(private location: Location, route: ActivatedRoute, private frais_api: GsbFraisService, private etat_api: GsbShortService, private router: Router) {
    this.etat_api.getListeEtats();
  }

  getListeEtat() {
    return this.etat_api.appels_terminesEtat;
  }

  onSubmitAjoutFrais() {
    this.frais_api.ajoutFrais(
      this.anneemois.value,
      this.nbjustificatifs.value,
      this.montantvalide.value,
      this.id_etat.value
    );
  }

  return() {
    this.location.back();
  }
}
