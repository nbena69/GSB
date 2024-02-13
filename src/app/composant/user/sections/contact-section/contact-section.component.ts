import { Component } from '@angular/core';
import {MenuUserComponent} from "../../menu-user/menu-user.component";

@Component({
  selector: 'app-contact-section',
  standalone: true,
    imports: [
        MenuUserComponent
    ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {

}
