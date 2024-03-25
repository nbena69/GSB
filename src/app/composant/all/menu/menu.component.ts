import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {GsbLoginService} from "../../../service/gsb-login.service";
import {CommonModule} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink, CommonModule, MenuComponent, MatMenu, MatButton, MatMenuItem, MatMenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {
  utilisateurConnecte: boolean = false;

  constructor(private loginService: GsbLoginService, private router: Router) {
  }

  ngOnInit() {
    this.utilisateurConnecte = this.loginService.estConnecte();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  profil() {
    this.router.navigate(['/dashboard']);
  }
}
