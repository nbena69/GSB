import { Component } from '@angular/core';
import {GsbShortService} from "../../../service/gsb-short.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-visiteur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search-visiteur.component.html',
  styleUrl: './search-visiteur.component.css'
})

export class SearchVisiteurComponent {
  id_visiteur: FormControl = new FormControl("");
  id_secteur: FormControl = new FormControl("");
  id_laboratoire: FormControl = new FormControl("");

  constructor(private shortService: GsbShortService) {
    this.shortService.getListeVisiteur();
    this.shortService.getListeSecteur();
    this.shortService.getListeLaboratoire();
  }

  getListeVisiteur() {
    return this.shortService.appels_terminesVisiteur;
  }

  getListeSecteur() {
    return this.shortService.appels_terminesSecteur;
  }

  getListeLaboratoire() {
    return this.shortService.appels_terminesLaboratoire;
  }
}
