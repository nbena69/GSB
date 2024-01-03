import { Component } from '@angular/core';
import {LeftSidebarComponent} from "./left-sidebar/left-sidebar.component";
import {RightContentComponent} from "./right-content/right-content.component";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    LeftSidebarComponent,
    RightContentComponent
  ],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {
  selectedSection: string = '';

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }
}
