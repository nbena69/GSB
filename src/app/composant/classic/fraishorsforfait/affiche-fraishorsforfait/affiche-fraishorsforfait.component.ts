import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../../all/menu/menu.component";
import {GsbFraishorsforfaitService} from "../../../../service/gsb-fraishorsforfait.service";
import {ActivatedRoute} from "@angular/router";
import {Fraishorsforfait} from "../../../../metier/api-gsb/fraishorsforfait";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-affiche-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle, ErrorMessageComponent],
  templateUrl: './affiche-fraishorsforfait.component.html',
  styleUrl: './affiche-fraishorsforfait.component.css'
})
export class AfficheFraishorsforfaitComponent {
  public id_fraishorsforfait: number = 0;
  public id_frais: number = 0;
  date_fraishorsforfait: FormControl = new FormControl('');
  montant_fraishorsforfait: FormControl = new FormControl('');
  lib_fraishorsforfait: FormControl = new FormControl('');
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, route: ActivatedRoute, private fraishorsforfait_api: GsbFraishorsforfaitService) {
    this.id_fraishorsforfait = parseInt(route.snapshot.paramMap.get('id_fraishorsforfait')!);
    this.fraishorsforfait_api.chargeFraisHorsForfait(this.id_fraishorsforfait).subscribe(
      data => {
        let fraishorsforfait = new Fraishorsforfait(data);
        this.date_fraishorsforfait.setValue(fraishorsforfait.date_fraishorsforfait);
        this.montant_fraishorsforfait.setValue(fraishorsforfait.montant_fraishorsforfait);
        this.lib_fraishorsforfait.setValue(fraishorsforfait.lib_fraishorsforfait);
        this.id_frais = fraishorsforfait.id_frais;
      },
      error => console.log('Erreur Appel API')
    );
  }

  return() {
    this.all_service.return();
  }

  onSubmitFicheFraisHorsForfait() {
    if (!this.id_frais || !this.date_fraishorsforfait.value || !this.montant_fraishorsforfait.value || !this.lib_fraishorsforfait.value) {
      this.errorMessage = "Veuillez remplir tous les champs.";

      // Suppression du message après 5 secondes
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);

      return;
    }

    // Envoi de la mise à jour du frais hors forfait
    this.fraishorsforfait_api.updateFraisHorsForfait(
      this.id_fraishorsforfait.valueOf(),
      this.id_frais,
      this.date_fraishorsforfait.value,
      this.montant_fraishorsforfait.value,
      this.lib_fraishorsforfait.value
    );
  }

}
