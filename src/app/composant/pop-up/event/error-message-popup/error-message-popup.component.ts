import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-error-message-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message-popup.component.html',
  styleUrl: './error-message-popup.component.css'
})
export class ErrorMessagePopupComponent {
  errorMessage: string | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.errorMessage = this.dialogData.errorMessage;
  }
  closeErrorMessage() {
    this.errorMessage = null;
  }
}
