import { Component } from '@angular/core';
import {GsbShortService} from "../../../service/gsb-short.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UpdateVisiteurPopupComponent} from "../../../pop-up/update-visiteur-popup/update-visiteur-popup.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {GsbVisiteurService} from "../../../service/gsb-visiteur.service";

@Component({
  selector: 'app-search-visiteur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink],
  templateUrl: './search-visiteur.component.html',
  styleUrl: './search-visiteur.component.css'
})

export class SearchVisiteurComponent {
  nom_visiteur: FormControl = new FormControl("");
  id_secteur: FormControl = new FormControl("");
  id_laboratoire: FormControl = new FormControl("");
  selector: boolean = true;
  active: boolean = false;

  constructor(private shortService: GsbShortService, public dialog: MatDialog, private visiteurService: GsbVisiteurService) {
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
      this.visiteurService.searchVisiteur(
        this.nom_visiteur.value,
        this.id_secteur.value,
        this.id_laboratoire.value,
      );
    } else {
      this.visiteurService.searchShort(
        this.nom_visiteur.value,
      );
      this.active = true;
    }
  }

  researchAvancee() {
    this.selector = !this.selector;
  }

  openUpdate() {
    this.dialog.open(UpdateVisiteurPopupComponent, {
      height: '90%',
      width: '40%',
    });
    console.log('reussi');
  }

  goBack() {
    this.active = false;
  }
}
