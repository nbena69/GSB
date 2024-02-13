import { Component } from '@angular/core';
import {MenuUserComponent} from "../../menu-user/menu-user.component";

@Component({
  selector: 'app-account-section',
  standalone: true,
    imports: [
        MenuUserComponent
    ],
  templateUrl: './account-section.component.html',
  styleUrl: './account-section.component.css'
})
export class AccountSectionComponent {

}
