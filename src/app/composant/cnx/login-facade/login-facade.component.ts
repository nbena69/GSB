import { Component } from '@angular/core';
import { GsbAuthService } from '../../../service/service-gsb/gsb-auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckbox } from "@angular/material/checkbox";
import { ErrorMessageComponent } from "../../all/error-message/error-message.component";
import { GsbAllService } from "../../../service/gsb-all.service";
import { CookieService } from "../../../service/service-cookie/cookie.service";

@Component({
  selector: 'app-login-facade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatCheckbox, ErrorMessageComponent],
  templateUrl: './login-facade.component.html',
  styleUrls: ['./login-facade.component.css']
})

export class LoginFacadeComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  hide = true;
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, private loginService: GsbAuthService, private cookieService: CookieService) {
    const savedEmail = this.cookieService.getCookie('email');
    const savedPasswordHash = this.cookieService.getCookie('password');
    if (savedEmail && savedPasswordHash) {
      this.email.setValue(savedEmail);
      this.password.setValue(savedPasswordHash);
    }
  }

  onSubmit() {
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    const rememberMe = true; // Vous devez obtenir l'état de la case à cocher à partir de l'interface


    if (rememberMe) {
      // Stockez le mot de passe haché dans le cookie
      this.cookieService.setCookie('email', emailValue);
      this.cookieService.setCookie('password', passwordValue);
    } else {
      // Si la case n'est pas cochée, supprimez les cookies précédemment stockés (s'ils existent)
      this.cookieService.deleteCookie('email');
      this.cookieService.deleteCookie('password');
    }

    this.loginService.serviceEnvoieLogin(emailValue, passwordValue)
      .subscribe(
        () => { },
        error => {
          this.errorMessage = "Une erreur s'est produite : " + error.error.error;
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      );
  }

  return() {
    this.all_service.return();
  }

  authRegister() {
    this.loginService.authRegister();
  }
}
