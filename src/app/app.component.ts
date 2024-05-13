import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./composant/all/menu/menu.component";
import {GsbAuthService} from "./service/service-gsb/gsb-auth.service";
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
  errorMessage: string | null = null;

  constructor(private loginService: GsbAuthService, private cdr: ChangeDetectorRef, private router: Router) {
    if (!this.isLoggedIn()) {
      this.timeOut(800);
    } else {
      this.timeOut(0);
    }
  }

  ngOnInit() {
    this.loginService.appels_termines.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  afficheMenu(): boolean {
    const currentUrl = this.router.url;
    return !((currentUrl === '/auth') || (currentUrl === '/auth'));
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  private timeOut(time: number) {
    setTimeout(() => {
      this.isLoading = false;
    }, time);
  }
}
