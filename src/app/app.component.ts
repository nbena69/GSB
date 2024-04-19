import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./composant/all/menu/menu.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {FooterComponent} from "./composant/all/footer/footer.component";
import {LoaderComponent} from "./composant/all/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MenuComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GSB';
  isLoading: boolean = true;

  constructor(private loginService: GsbLoginService, private cdr: ChangeDetectorRef, private router: Router) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnInit() {
    this.loginService.appels_termines.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  afficheMenu(): boolean {
    const currentUrl = this.router.url;

    return !((currentUrl === '/login-facade') || (currentUrl === '/register-facade'));
  }
}
