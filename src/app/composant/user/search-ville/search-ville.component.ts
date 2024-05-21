import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {Visiteur} from "../../../metier/api-gsb/visiteur";
import {Praticien} from "../../../metier/api-gsb/praticien";
import {MatRadioModule} from "@angular/material/radio";
import {GsbShortService} from "../../../service/service-gsb/gsb-short.service";
import {GsbSearchService} from "../../../service/service-gsb/gsb-search.service";

@Component({
  selector: 'app-search-ville',
  standalone: true,
  imports: [MatRadioModule, CommonModule, ReactiveFormsModule, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './search-ville.component.html',
  styleUrl: './search-ville.component.css'
})

export class SearchVilleComponent {
  ville: FormControl = new FormControl("");
  selectedOption = new FormControl('visiteur');
  active: boolean = false;
  visiteurs: Visiteur[] = [];
  praticien: Praticien[] = [];
  errorMessage: string | null = null;

  constructor(private shortService: GsbShortService, public dialog: MatDialog, private searchService: GsbSearchService, private router: Router) {
  }

  researchVisiteur() {
    if (this.selectedOption.value == "visiteur") {
      this.searchService.searchVilleVisiteur(this.ville.value)
        .subscribe(
          data => {
            this.visiteurs = data;
          },
          error => {
            this.errorMessage = "Une erreur s'est produite : " + error.error.error;
            setTimeout(() => {
              this.errorMessage = null;
            }, 5000);
          }
        );
    } else {
      this.searchService.searchVillePraticien(this.ville.value)
        .subscribe(
          data => {
            this.praticien = data;
          },
          error => {
            this.errorMessage = "Une erreur s'est produite : " + error.error.error;
            setTimeout(() => {
              this.errorMessage = null;
            }, 5000);
          }
        );
    }
    this.active = true;
  }

  openUpdate(id_visiteur: number, id_praticien: number) {
    if (this.selectedOption.value == "visiteur") {
      this.router.navigate(['/activite/liste'], { queryParams: { id_visiteur: id_visiteur}});
    } else {
      this.router.navigate(['/activite/liste'], { queryParams: { id_praticien: id_praticien}});
    }
  }

  goBack() {
    this.active = false;
  }
}
