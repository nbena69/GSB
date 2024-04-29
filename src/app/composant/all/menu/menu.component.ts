import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {GsbAuthService} from "../../../service/gsb-auth.service";
import {CommonModule} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RecontactPopupComponent} from "../../pop-up/recontact-popup/recontact-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink, CommonModule, MenuComponent, MatMenu, MatButton, MatMenuItem, MatMenuModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {
  utilisateurConnecte: boolean = false;
  adminConnecte: boolean = false;

  constructor(private loginService: GsbAuthService, private router: Router, public dialog: MatDialog) {
    if (loginService.visiteurType() === 'A') {
      this.adminConnecte = true;
    }  }

  ngOnInit() {
    this.utilisateurConnecte = this.loginService.estConnecte();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth']);
  }

  profil() {
    this.router.navigate(['/dashboard']);
  }

  openRecontact() {
    this.dialog.open(RecontactPopupComponent, {
      height: '650px',
      width: '864px'
    });
  }
}
