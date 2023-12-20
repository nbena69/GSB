import {Component} from '@angular/core';
import {MenuComponent} from "../../menu/menu.component";
import {ListeFraisComponent} from "../frais/liste-frais/liste-frais.component";
import {GsbLoginService} from "../../service/gsb-login.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MenuComponent,
        ListeFraisComponent, CommonModule, RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  utilisateurConnecte: boolean = false;
  constructor(private loginService: GsbLoginService) {
  }

  ngOnInit() {
    this.utilisateurConnecte = this.loginService.estConnecte();
    console.log(this.utilisateurConnecte);
  }
}
