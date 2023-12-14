import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {GsbLoginService} from "../../service/gsb-login.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private loginService: GsbLoginService) {}

  logout() {
    this.loginService.logout();
  }

}
