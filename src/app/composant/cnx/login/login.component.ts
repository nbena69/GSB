import {Component} from '@angular/core';
import {GsbLoginService} from '../../../service/gsb-login.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, Location} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDividerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: FormControl = new FormControl('Villechalane');
  password: FormControl = new FormControl('secret');
  hide = true;

  constructor(private loginService: GsbLoginService, private location: Location) {
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
}
