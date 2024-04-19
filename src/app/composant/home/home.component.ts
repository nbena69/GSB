import {Component} from '@angular/core';
import {MenuComponent} from "../all/menu/menu.component";
import {ListeFraisComponent} from "../classic/frais/liste-frais/liste-frais.component";
import {GsbAuthService} from "../../service/gsb-auth.service";
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
  constructor(private loginService: GsbAuthService) {
  }

  ngOnInit() {
    this.utilisateurConnecte = this.loginService.estConnecte();
  }
}
