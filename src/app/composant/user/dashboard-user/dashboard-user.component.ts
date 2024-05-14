import { Component } from '@angular/core';
import {UpdateUserComponent} from "../update-user/update-user.component";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    UpdateUserComponent
  ],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {
}
