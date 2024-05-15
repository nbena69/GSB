import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-error-message-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message-popup.component.html',
  styleUrl: './error-message-popup.component.css'
})
export class ErrorMessagePopupComponent {
  errorMessage: string | null = null;
  closeErrorMessage() {
    this.errorMessage = null;
  }
}
