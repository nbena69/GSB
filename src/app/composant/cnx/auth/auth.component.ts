import {Component, OnInit} from '@angular/core';
import {LoginFacadeComponent} from "../login-facade/login-facade.component";
import {MatIcon} from "@angular/material/icon";
import {AuthContentFacadeComponent} from "../auth-content-facade/auth-content-facade.component";
import {RegisterFacadeComponent} from "../register-facade/register-facade.component";
import {NgIf} from "@angular/common";
import {GsbAuthService} from "../../../service/gsb-auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatIcon,
    LoginFacadeComponent,
    AuthContentFacadeComponent,
    RegisterFacadeComponent,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit {
  auth: boolean = false;

  constructor(private authService: GsbAuthService) {}

  ngOnInit() {
    this.auth = this.authService.authValue();
  }
}
