import {Component} from '@angular/core';
import {GsbActiviteService} from "../../../../service/service-gsb/classic/gsb-activite.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
import {GsbAuthService} from "../../../../service/service-gsb/gsb-auth.service";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-liste-activite',
  standalone: true,
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption
  ],
  templateUrl: './liste-activite.component.html',
  styleUrl: './liste-activite.component.css'
})

export class ListeActiviteComponent {
  public id_praticien: number = 0;
  public id_visiteur: number = 0;

  constructor(private activite_api: GsbActiviteService, private authService: GsbAuthService, private all_service: GsbAllService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id_visiteur = params['id_visiteur'];
      this.id_praticien = params['id_praticien'];

      if (this.id_praticien) {
        this.activite_api.listeActiviteDuPraticien(this.id_praticien);
      } else if (this.id_visiteur) {
        this.activite_api.listeActiviteDuVisiteurV2(this.id_visiteur);
      } else if (this.authService.visiteurType() === 'A') {
        this.activite_api.getListeActivite();
      } else {
        this.activite_api.listeActiviteDuVisiteur();
      }
    });
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

  async deleteActivite(id_activite: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?');

    if (confirmation) {
      try {
        await this.activite_api.deleteActivite(id_activite).toPromise();
        await this.all_service.delay(1000);

        if (this.authService.visiteurType() === 'A') {
          await this.activite_api.getListeActivite();
        } else {
          await this.activite_api.listeActiviteDuVisiteur();
        }
      } catch (error) {
        console.error("Erreur lors de l'appel API suppression Activite :", error);
      }
    }
  }

  siDatePasser(date: string): boolean {
    const currentDate = new Date();

    const [day, month, year] = date.split('-').map(part => parseInt(part, 10));

    const activityDate = new Date(year, month - 1, day);

    return activityDate < currentDate;
  }
}
