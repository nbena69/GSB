import {Component} from '@angular/core';
import {GsbAuthService} from '../../../service/gsb-auth.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {GsbAllService} from "../../../service/gsb-all.service";

@Component({
  selector: 'app-login-facade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatCheckbox, ErrorMessageComponent],
  templateUrl: './login-facade.component.html',
  styleUrls: ['./login-facade.component.css']
})

export class LoginFacadeComponent {
  email: FormControl = new FormControl('Villechalane');
  password: FormControl = new FormControl('secret');
  hide = true;
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, private loginService: GsbAuthService) {
  }

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    ).subscribe(
      () => {},
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
