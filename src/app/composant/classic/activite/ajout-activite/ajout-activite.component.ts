import {Component} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GsbActiviteService} from "../../../../service/gsb-activite.service";
import {MenuComponent} from "../../../all/menu/menu.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";

@Component({
  selector: 'app-ajout-activite',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, CommonModule, MatFormField, MatLabel, MatHint, MatInput, MatFormFieldModule, MatInputModule, ErrorMessageComponent],
  templateUrl: './ajout-activite.component.html',
  styleUrl: './ajout-activite.component.css'
})
export class AjoutActiviteComponent {
  date_activite: FormControl = new FormControl('');
  lieu_activite: FormControl = new FormControl('');
  theme_activite: FormControl = new FormControl('');
  motif_activite: FormControl = new FormControl('');
  errorMessage: string | null = null;

  constructor(private location: Location, route: ActivatedRoute, private activite_api: GsbActiviteService, private router: Router) {
  }

  onSubmitAjoutActivite() {
    const dateActivite = this.date_activite.value;
    const lieuActivite = this.lieu_activite.value;
    const themeActivite = this.theme_activite.value;
    const motifActivite = this.motif_activite.value;

    if (!dateActivite || !lieuActivite || !themeActivite || !motifActivite) {
      this.errorMessage = "Tous les champs doivent être remplis.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return;
    }

    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateActivite)) {
      this.errorMessage = "Format de date incorrect. Le format attendu est 'jj-mm-aaaa'.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return;
    }

    this.activite_api.ajoutActivite(dateActivite, lieuActivite, themeActivite, motifActivite);
  }

  return() {
    this.location.back();
  }
}
