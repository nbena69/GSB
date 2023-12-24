import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {MenuComponent} from "../../all/menu/menu.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-liste-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MenuComponent],
  templateUrl: './liste-fraishorsforfait.component.html',
  styleUrl: './liste-fraishorsforfait.component.css'
})

export class ListeFraishorsforfaitComponent{
  public id_frais: number = 0;

  constructor(private location: Location, private route: ActivatedRoute, private fraisHorsForfait_api: GsbFraishorsforfaitService, private router: Router) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    this.fraisHorsForfait_api.listeFraisHorsForfait(this.id_frais);
  }

  getListeFraisHorsForfait() {
    return this.fraisHorsForfait_api.appels_termines;
  }

  afficherDetailsFraisHf(id_fraishorsforfait: number){
    this.router.navigate(["fraisHF/affiche", id_fraishorsforfait]);
  }

  return() {
    this.location.back();
  }

  ajoutFraisHF(){
    this.router.navigate(["fraisHF/ajout"]);
  }
}
