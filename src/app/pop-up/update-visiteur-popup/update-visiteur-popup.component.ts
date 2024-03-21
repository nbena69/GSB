import {Component} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-update-visiteur-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './update-visiteur-popup.component.html',
  styleUrl: './update-visiteur-popup.component.css'
})
export class UpdateVisiteurPopupComponent {
  constructor(public dialogRef: MatDialogRef<UpdateVisiteurPopupComponent>) {}

  closePopup() {
    this.dialogRef.close();
  }
}
