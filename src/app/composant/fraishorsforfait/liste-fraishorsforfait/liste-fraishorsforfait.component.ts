import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {MenuComponent} from "../../all/menu/menu.component";

@Component({
  selector: 'app-liste-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent],
  templateUrl: './liste-fraishorsforfait.component.html',
  styleUrl: './liste-fraishorsforfait.component.css'
})

export class ListeFraishorsforfaitComponent {
  public id_frais: number = 1;

  constructor(private location: Location, private route: ActivatedRoute, private fraisHorsForfait_api: GsbFraishorsforfaitService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    this.fraisHorsForfait_api.listeFraisHorsForfait(this.id_frais);
    console.log(this.id_frais)
  }

  supprimerFraisHorsForfait(id_fraishorsforfait: number) {
    // Mettez ici le code pour supprimer le frais hors forfait avec l'id spécifié
  }

  getListeFraisHorsForfait() {
    return this.fraisHorsForfait_api.appels_termines;
  }

  afficherDetailsFraisHf(id_frais: number){

  }

  return() {
    this.location.back();
  }
}
