import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./composant/all/menu/menu.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {FooterComponent} from "./composant/all/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GSB';

  constructor(private loginService: GsbLoginService, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.loginService.appels_termines.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  afficheMenu(): boolean {
    const currentUrl = this.router.url;

    if ((currentUrl === '/login') || (currentUrl === '/register')) {
      return false;
    }
    return true;
  }
}
