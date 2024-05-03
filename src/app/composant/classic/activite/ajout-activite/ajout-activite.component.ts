import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GsbActiviteService} from "../../../../service/gsb-activite.service";
import {MenuComponent} from "../../../all/menu/menu.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-ajout-activite',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MenuComponent, ReactiveFormsModule, CommonModule, MatFormField, MatLabel, MatHint, MatInput, MatDatepicker, MatDatepickerToggle, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './ajout-activite.component.html',
  styleUrl: './ajout-activite.component.css'
})
export class AjoutActiviteComponent {
  date_activite: FormControl = new FormControl('');
  lieu_activite: FormControl = new FormControl('');
  theme_activite: FormControl = new FormControl('');
  motif_activite: FormControl = new FormControl('');

  constructor(private location: Location, route: ActivatedRoute, private activite_api: GsbActiviteService, private router: Router) {
  }

  onSubmitAjoutActivite() {
    const date = this.formatDate(this.date_activite.value);

  }

  return() {
    this.location.back();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à partir de 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
