import {Component} from '@angular/core';
import {MenuComponent} from "../../../all/menu/menu.component";
import {Router, RouterLink} from "@angular/router";
import {GsbFraisService} from "../../../../service/service-gsb/gsb-frais.service";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {GsbAuthService} from "../../../../service/service-gsb/gsb-auth.service";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-liste-frais',
  standalone: true,
  imports: [
    MenuComponent, CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption
  ],
  templateUrl: './liste-frais.component.html',
  styleUrl: './liste-frais.component.css',
})

export class ListeFraisComponent {
  constructor(private all_service: GsbAllService, private frais_api: GsbFraisService, private authService: GsbAuthService, private router: Router) {
    if (authService.visiteurType() === 'A') {
      this.frais_api.getListeFrais();
    } else {
      this.frais_api.listeFraisDuVisiteur();
    }
  }

  getListeFrais() {
    return this.frais_api.appels_termines;
  }

  afficherDetailsFrais(id_frais: number) {
    this.router.navigate(['/frais/affiche', id_frais]);
  }

  return() {
    this.all_service.return();
  }

  isFraisListPage(): boolean {
    return this.router.url === '/frais/liste';
  }

  ajoutFrais() {
    this.router.navigate(['/frais/ajout']);
  }

  deleteFrais(id_frais: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce frais ?');

    if (confirmation) {
      this.frais_api.deleteFrais(id_frais).subscribe(
        () => {
        },
        error => {
          console.error("Erreur lors de l'appel API suppression frais :", error);
        }
      );
    }
  }
}
