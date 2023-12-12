import { Component, Input } from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";
import {RouterLink} from "@angular/router";

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

  supprimerFrais(id: number) {

  }

}
