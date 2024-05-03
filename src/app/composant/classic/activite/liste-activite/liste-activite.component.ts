import { Component } from '@angular/core';
import {GsbActiviteService} from "../../../../service/gsb-activite.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
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
import {GsbAuthService} from "../../../../service/gsb-auth.service";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-liste-activite',
  standalone: true,
  imports: [ MenuComponent, CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption
  ],
  templateUrl: './liste-activite.component.html',
  styleUrl: './liste-activite.component.css'
})

export class ListeActiviteComponent {
  constructor(private activite_api: GsbActiviteService, private authService: GsbAuthService, private all_service: GsbAllService, private router: Router) {
    if (authService.visiteurType() === 'A') {
      this.activite_api.getListeActivite();
    } else {
      this.activite_api.listeActiviteDuVisiteur();
    }
  }

  getListeActivite() {
    return this.activite_api.appels_termines;
  }

  afficherDetailsActivite(id_activite: number) {
    this.router.navigate(['/activite/affiche', id_activite]);
  }

  return() {
    this.all_service.return();
  }

  deleteActivite(id_activite: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?');

    if (confirmation) {
      this.activite_api.deleteActivite(id_activite).subscribe(
        () => {
        },
        error => {
          console.error("Erreur lors de l'appel API suppression Activite :", error);
        }
      );
    }
  }
}
