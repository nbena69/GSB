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

  constructor(private shortService: GsbShortService) {
    this.shortService.getListeVisiteur();
  }

  getListeVisiteur() {
    return this.shortService.appels_terminesVisiteur;
  }
}
