import { Component } from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";

@Component({
  selector: 'app-liste-frais',
  standalone: true,
    imports: [
        MenuComponent
    ],
  templateUrl: './liste-frais.component.html',
  styleUrl: './liste-frais.component.css'
})
export class ListeFraisComponent {

}
