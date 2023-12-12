import { Component, Input } from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";
import {RouterLink} from "@angular/router";
import {GsbLoginService} from "../../../service/gsb-login.service";

@Component({
  selector: 'app-liste-frais',
  standalone: true,
    imports: [
        MenuComponent, RouterLink
    ],
  templateUrl: './liste-frais.component.html',
  styleUrl: './liste-frais.component.css'
})
export class ListeFraisComponent {
  @Input() frais: any;

  constructor(public requetes: GsbLoginService) {

  }

  supprimerFrais(id: number) {

  }

}
