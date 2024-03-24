import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../all/menu/menu.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-ajout-fraishorsforfait',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MenuComponent, ReactiveFormsModule, CommonModule, MatInputModule, MatIcon, MatButtonModule, MatFormField, MatLabel, MatOption, MatDialogModule, MatCardTitle, MatDividerModule, MatDatepickerToggle, MatDatepicker, MatDatepickerModule
  ],
  templateUrl: './ajout-fraishorsforfait.component.html',
  styleUrl: './ajout-fraishorsforfait.component.css'
})

export class AjoutFraishorsforfaitComponent {
  public id_frais: number = 0;
  date_fraishorsforfait: FormControl = new FormControl('');
  montant_fraishorsforfait: FormControl = new FormControl('');
  lib_fraishorsforfait: FormControl = new FormControl('');

  constructor(private location: Location, route: ActivatedRoute, private fraishorsforfait_api: GsbFraishorsforfaitService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
  }

  onSubmitAjoutFraisHorsForfait() {
    this.fraishorsforfait_api.ajoutFraisHorsForfait(
      this.id_frais,
      this.date_fraishorsforfait.value,
      this.montant_fraishorsforfait.value,
      this.lib_fraishorsforfait.value
    );
  }

  return() {
    this.location.back();
  }
}
