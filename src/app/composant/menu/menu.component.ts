import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {GsbLoginService} from "../../service/gsb-login.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  utilisateurConnecte: boolean = false;

  constructor(private loginService: GsbLoginService) {
  }

  ngOnInit() {
    this.utilisateurConnecte = this.loginService.estConnecte();
    console.log(this.utilisateurConnecte);
  }

  logout() {
    this.loginService.logout();
  }
}
