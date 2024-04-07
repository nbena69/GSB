import { Component } from '@angular/core';
import {GsbActiviteService} from "../../../../service/gsb-activite.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import {MenuComponent} from "../../../all/menu/menu.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-liste-activite',
  standalone: true,
  imports: [ MenuComponent, CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption
  ],
  templateUrl: './liste-activite.component.html',
  styleUrl: './liste-activite.component.css'
})

export class ListeActiviteComponent {
  constructor(private activite_api: GsbActiviteService, private router: Router, private location: Location) {
    this.activite_api.getListeActivite();
  }

  getListeActivite() {
    return this.activite_api.appels_termines;
  }

  /*afficherDetailsActivite(id_activite: number) {
    this.router.navigate(['/activite/liste', id_activite]);
  }*/

  return() {
    this.location.back();
  }

  /*deleteFrais(id_frais: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce frais ?');

    if (confirmation) {
      this.activite_api.deleteActivite(id_frais).subscribe(
        () => {
          console.log("Appel API suppression frais réussi");
        },
        error => {
          console.error("Erreur lors de l'appel API suppression frais :", error);
        }
      );
    }
  }*/
}
