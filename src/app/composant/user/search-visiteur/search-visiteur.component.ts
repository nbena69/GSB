import { Component } from '@angular/core';
import {GsbShortService} from "../../../service/service-gsb/gsb-short.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UpdateAffectationPopupComponent} from "../../pop-up/update-affectation-popup/update-affectation-popup.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Visiteur} from "../../../metier/api-gsb/visiteur";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {GsbSearchService} from "../../../service/service-gsb/gsb-search.service";

@Component({
  selector: 'app-search-visiteur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './search-visiteur.component.html',
  styleUrl: './search-visiteur.component.css'
})

export class SearchVisiteurComponent {
  nom_visiteur: FormControl = new FormControl("");
  id_secteur: FormControl = new FormControl("");
  id_laboratoire: FormControl = new FormControl("");
  selector: boolean = true;
  active: boolean = false;
  visiteurs: Visiteur[] = [];
  errorMessage: string | null = null;

  constructor(private shortService: GsbShortService, public dialog: MatDialog, private searchService: GsbSearchService) {
    this.shortService.getListeSecteur();
    this.shortService.getListeLaboratoire();
  }

  getListeSecteur() {
    return this.shortService.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.shortService.appels_terminesLaboratoire;
  }

  researchVisiteur() {
    if(this.selector) {
      this.searchService.searchVisiteur(this.nom_visiteur.value, this.id_secteur.value, this.id_laboratoire.value)
        .subscribe(
          data => {
            this.visiteurs = data;
          },
          error => {
            this.errorMessage = "Une erreur s'est produite : " + error.error.error;
            setTimeout(() => {
              this.errorMessage = null;
            }, 5000);
          }
        );
    } else {
      this.searchService.searchShort(this.nom_visiteur.value)
        .subscribe(
          data => {
            this.visiteurs = data;
          },
          error => {
            this.errorMessage = "Une erreur s'est produite : " + error.error.error;
            setTimeout(() => {
              this.errorMessage = null;
            }, 5000);
          }
        );
    }
    this.active = true;
  }

  researchAvancee() {
    this.selector = !this.selector;
    this.nom_visiteur.setValue("");
    this.id_secteur.setValue("");
    this.id_laboratoire.setValue("");
  }

  openUpdate(id_visiteur: number) {
    this.dialog.open(UpdateAffectationPopupComponent, {
      height: '55%',
      width: '30%',
      data: { id_visiteur: id_visiteur }
    });
  }

  goBack() {
    this.active = false;
  }
}
