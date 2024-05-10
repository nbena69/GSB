import { Component } from '@angular/core';
import { GsbAuthService } from '../../../service/service-gsb/gsb-auth.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { ErrorMessageComponent } from "../../all/error-message/error-message.component";
import { GsbAllService } from "../../../service/gsb-all.service";
import { CookieService } from "../../../service/service-cookie/cookie.service";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-facade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatCheckbox, MatCheckboxModule, ErrorMessageComponent],
  templateUrl: './login-facade.component.html',
  styleUrls: ['./login-facade.component.css']
})

export class LoginFacadeComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  rememberMe: boolean = true;
  decryptedPassword: string = "";
  hide = true;
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, private loginService: GsbAuthService, private cookieService: CookieService) {
    const savedEmail = this.cookieService.getCookie('email');
    const savedPassword = this.cookieService.getCookie('password');
    this.decryptedPassword = savedPassword ? CryptoJS.AES.decrypt(savedPassword, this.loginService.recupereBearer()).toString(CryptoJS.enc.Utf8) : '';
    if (savedEmail) {
      this.email.setValue(savedEmail);
    }
    if (this.decryptedPassword) {
      this.password.setValue(this.decryptedPassword);
    }
  }

  onSubmit() {
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (!emailValue || !passwordValue) {
      this.errorMessage = "Veuillez saisir une adresse e-mail et un mot de passe.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(passwordValue, this.loginService.recupereBearer()).toString();

    if (this.rememberMe) {
      this.cookieService.setCookie('email', emailValue, 30);
      this.cookieService.setCookie('password', encryptedPassword, 30);
    } else {
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
