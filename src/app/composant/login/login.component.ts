import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { GsbLoginService } from '../../service/gsb-login.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

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

  constructor(private loginService: GsbLoginService) {}

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    );
    console.log("Methode onSubmit bien appellée");
  }
}
