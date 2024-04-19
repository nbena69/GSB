import { Component } from '@angular/core';
import {LoginFacadeComponent} from "../login-facade/login-facade.component";
import {MatIcon} from "@angular/material/icon";
import {AuthContentFacadeComponent} from "../auth-content-facade/auth-content-facade.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatIcon,
    LoginFacadeComponent,
    AuthContentFacadeComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
