import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {MenuComponent} from "../../../menu/menu.component";

@Component({
  selector: 'app-liste-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent],
  templateUrl: './liste-fraishorsforfait.component.html',
  styleUrl: './liste-fraishorsforfait.component.css'
})
export class ListeFraishorsforfaitComponent {
  id_frais: number = 1;

  constructor(private location: Location, private router: Router, private fraisHorsForfait_api: GsbFraishorsforfaitService) {}

  supprimerFraisHorsForfait(id_fraishorsforfait: number) {
    // Mettez ici le code pour supprimer le frais hors forfait avec l'id spécifié
  }

  getFraisHorsForfait() {
    this.fraisHorsForfait_api.listeFraisHorsForfait(this.id_frais);
  }

  getListeFraisHorsForfait() {
    return this.fraisHorsForfait_api.appels_termines;
  }

  return() {
    this.location.back();
  }

}
