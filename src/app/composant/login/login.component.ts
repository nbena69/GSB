import {Component} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {GsbLoginService} from '../../service/gsb-login.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, Location} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  showPassword: boolean = false;
  showText: boolean = false;

  constructor(private loginService: GsbLoginService, private location: Location) {
  }

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    );
  }

  voirMdp() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  return() {
    this.location.back();
  }
}
