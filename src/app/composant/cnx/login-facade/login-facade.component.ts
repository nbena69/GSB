import {Component, Input} from '@angular/core';
import {GsbAuthService} from '../../../service/gsb-auth.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-login-facade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule, MatCheckbox],
  templateUrl: './login-facade.component.html',
  styleUrls: ['./login-facade.component.css']
})

export class LoginFacadeComponent {
  email: FormControl = new FormControl('Villechalane');
  password: FormControl = new FormControl('secret');
  hide = true;

  constructor(private loginService: GsbAuthService, private location: Location) {
  }

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    );
  }

  return() {
    this.location.back();
  }

  authRegister() {
    this.loginService.authRegister();
  }
}
