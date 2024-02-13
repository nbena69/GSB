import { Component } from '@angular/core';
import {MenuUserComponent} from "../../menu-user/menu-user.component";

@Component({
  selector: 'app-notification-section',
  standalone: true,
    imports: [
        MenuUserComponent
    ],
  templateUrl: './notification-section.component.html',
  styleUrl: './notification-section.component.css'
})
export class NotificationSectionComponent {

}
