import {Component, Inject, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() errorMessage: string | null = null;
  closeErrorMessage() {
    this.errorMessage = null;
  }
}
