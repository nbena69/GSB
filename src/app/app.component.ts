import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {GsbLoginService} from "./service/gsb-login.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GSB Frais';

  constructor(private loginService: GsbLoginService, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.loginService.appels_termines.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  shouldDisplayMenu(): boolean {
    const currentUrl = this.router.url;

    if ((currentUrl === '/login') || (currentUrl === '/register')) {
      return false;
    }
    return true;
  }
}
