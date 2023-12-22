import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {GsbLoginService} from "../../../service/gsb-login.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink, CommonModule, MenuComponent
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
}
