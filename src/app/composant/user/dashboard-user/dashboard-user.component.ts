import { Component } from '@angular/core';
import {MenuUserComponent} from "../menu-user/menu-user.component";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    MenuUserComponent
  ],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {
}
