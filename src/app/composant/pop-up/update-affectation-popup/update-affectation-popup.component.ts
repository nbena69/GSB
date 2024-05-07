import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbShortService} from "../../../service/service-gsb/gsb-short.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {GsbVisiteurService} from "../../../service/service-gsb/gsb-visiteur.service";
import {ErrorMessageComponent} from "../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatCardTitle} from "@angular/material/card";
import {Visiteur} from "../../../metier/api-gsb/visiteur";
import {GsbAffectationService} from "../../../service/service-gsb/gsb-affectation.service";
import {Travailler} from "../../../metier/api-gsb/travailler";
import {GsbAllService} from "../../../service/gsb-all.service";

@Component({
  selector: 'app-update-affectation-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    ErrorMessageComponent,
    MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle
  ],
  templateUrl: './update-affectation-popup.component.html',
  styleUrl: './update-affectation-popup.component.css'
})

export class UpdateAffectationPopupComponent {
  public id_visiteur: number = 0;
  nom_visiteur: FormControl = new FormControl('');
  prenom_visiteur: FormControl = new FormControl('');
  id_laboratoire: FormControl = new FormControl('');
  id_travail: FormControl = new FormControl(0);

  id_secteur: FormControl = new FormControl('');
  id_region: FormControl = new FormControl('');
  role_visiteur: FormControl = new FormControl('Visiteur');
  jjmmaa: FormControl = new FormControl("");

  errorMessage: string | null = null;
  valuePage: number = 1;
  affectationValue: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private all_service: GsbAllService, private shortService: GsbShortService, private visiteurService: GsbVisiteurService, private affectationService: GsbAffectationService) {
    this.actualiseValue();
    this.id_visiteur = this.dialogData.id_visiteur;
    this.visiteurService.chargeVisiteur(this.id_visiteur).subscribe(
      dataVisiteur => {
        let visiteur = new Visiteur(dataVisiteur);
        this.id_laboratoire.setValue(visiteur.id_laboratoire);
        this.nom_visiteur.setValue(visiteur.nom_visiteur);
        this.prenom_visiteur.setValue(visiteur.prenom_visiteur);
        console.log(dataVisiteur)
      },
      error => console.log('Erreur Appel API')
    );
    this.nom_visiteur.disable();
    this.prenom_visiteur.disable();
    this.id_laboratoire.disable();
    this.role_visiteur.disable();
    this.id_secteur.disable();
    this.affectationService.getListeAffectationVisiteur(this.id_visiteur);
    this.shortService.getListeLaboratoire();
    this.shortService.getListeRegionSecteur();
  }

  getListeAffectationVisiteur() {
    if(this.affectationService.affectationValue) {
      this.affectationValue = this.affectationService.affectationValue;
      return this.affectationService.appels_terminesAffectationVisiteur;
    } else {
      this.affectationValue = this.affectationService.affectationValue;
      return;
    }
  }

  updatePage() {
    this.actualiseValue();
    if (this.id_travail.value != 0) {
      this.affectationService.getListeAffectationUnique(this.id_travail.value).subscribe(
        dataUnique => {
          let travailler = new Travailler(dataUnique);
          this.id_secteur.setValue(travailler.id_secteur);
          this.id_region.setValue(travailler.id_region);
          this.role_visiteur.setValue(travailler.role_visiteur);
          this.jjmmaa.setValue(travailler.jjmmaa);
          this.shortService.getListeSecteur();
          this.shortService.getListeRegion();
          console.log(dataUnique);
        }
      )
      this.valuePage = 3;
    }
    if (this.id_travail.value == 0) {
      this.errorMessage = "Aucune affectation sélectionnée.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }

  ajoutPage() {
    this.actualiseValue();

    this.shortService.getListeSecteur();
    this.shortService.getListeRegion();

    this.valuePage = 2;
  }

  async onSubmitAjoutAffectation() {
    if (
      this.jjmmaa.value !== '' &&
      this.id_region.value !== '' &&
      this.role_visiteur.value !== ''
    ) {
      this.affectationService.ajoutAffectation(
        this.id_visiteur.valueOf(),
        this.jjmmaa.value,
        this.id_region.value,
        this.role_visiteur.value
      );
      this.valuePage = 1;
      await this.all_service.delay(1000);
      this.affectationService.getListeAffectationVisiteur(this.id_visiteur);
    } else {
      this.errorMessage = "Veuillez remplir tous les champs.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }

  async onSubmitUpdateAffectation() {
    if (
      this.jjmmaa.value !== '' &&
      this.id_region.value !== '' &&
      this.role_visiteur.value !== ''
    ) {
      this.affectationService.updateAffectation(
        this.id_travail.value,
        this.id_visiteur.valueOf(),
        this.jjmmaa.value,
        this.id_region.value,
        this.role_visiteur.value
      );
      this.valuePage = 1;
      await this.all_service.delay(1000);
      this.affectationService.getListeAffectationVisiteur(this.id_visiteur);
    } else {
      this.errorMessage = "Veuillez remplir tous les champs.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    }
  }

  deleteAffectation(id_travail: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette Affectation ?');

    if (confirmation) {
      this.affectationService.deleteAffectation(id_travail).subscribe(
        () => {
          console.log("Appel API suppression Affectation réussi");
          this.valuePage = 1;
          this.affectationService.getListeAffectationVisiteur(this.id_visiteur);
        },
        error => {
          this.errorMessage = "Erreur lors de l'appel API suppression Affectation : " + error;
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      );
    }
  }

  actualiseSecteur(id_regionValue: number) {
    this.id_secteur.setValue(id_regionValue);
  }

  getListeLaboratoire() {
    return this.shortService.appels_terminesLaboratoire;
  }

  getListeRegionSecteur() {
    return this.shortService.appels_terminesRegionSecteur;
  }

  goBack() {
    this.valuePage = 1;
  }

  actualiseValue() {
    this.id_secteur.setValue("");
    this.id_region.setValue("");
    this.jjmmaa.setValue("");
    this.role_visiteur.setValue("Visiteur");
  }
}
