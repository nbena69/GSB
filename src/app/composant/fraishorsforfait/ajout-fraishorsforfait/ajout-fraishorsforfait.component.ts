import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../all/menu/menu.component";

@Component({
  selector: 'app-ajout-fraishorsforfait',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './ajout-fraishorsforfait.component.html',
  styleUrl: './ajout-fraishorsforfait.component.css'
})
export class AjoutFraishorsforfaitComponent {
  public id_frais: number = 0;
  date_fraishorsforfait: FormControl = new FormControl('');
  montant_fraishorsforfait: FormControl = new FormControl('');
  lib_fraishorsforfait: FormControl = new FormControl('');

  constructor(private location:Location, route: ActivatedRoute, private fraishorsforfait_api: GsbFraishorsforfaitService) {
  }

  onSubmitAjoutFraisHorsForfait() {
    this.fraishorsforfait_api.ajoutFraisHorsForfait(
      this.id_frais,
      this.date_fraishorsforfait.value,
      this.montant_fraishorsforfait.value,
      this.lib_fraishorsforfait.value
    );
  }

  return() {
    this.location.back();
  }
}
