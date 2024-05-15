import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

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
