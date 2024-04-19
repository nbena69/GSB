import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth-content-facade',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './auth-content-facade.component.html',
  styleUrl: './auth-content-facade.component.css'
})
export class AuthContentFacadeComponent {

}
