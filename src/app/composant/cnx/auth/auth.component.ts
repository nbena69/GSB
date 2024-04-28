import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginFacadeComponent} from "../login-facade/login-facade.component";
import {MatIcon} from "@angular/material/icon";
import {AuthContentFacadeComponent} from "../auth-content-facade/auth-content-facade.component";
import {RegisterFacadeComponent} from "../register-facade/register-facade.component";
import {CommonModule, NgIf} from "@angular/common";
import {GsbAuthService} from "../../../service/gsb-auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatIcon,
    LoginFacadeComponent,
    AuthContentFacadeComponent,
    RegisterFacadeComponent,
    NgIf,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit {
  auth: boolean = true;
  private authSubscription!: Subscription;

  constructor(private authService: GsbAuthService) {

  }

  ngOnInit() {
    this.authSubscription = this.authService.auth$.subscribe(auth => {
      this.auth = auth;
    });
  }
}
