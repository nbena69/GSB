import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GsbFraishorsforfaitService} from "../../../../service/gsb-fraishorsforfait.service";
import {MenuComponent} from "../../../all/menu/menu.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-liste-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MenuComponent, MatDialogModule, RouterLink, ErrorMessageComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './liste-fraishorsforfait.component.html',
  styleUrl: './liste-fraishorsforfait.component.css'
})

export class ListeFraishorsforfaitComponent{
  public id_frais: number = 0;

  constructor(private all_service: GsbAllService, private route: ActivatedRoute, private fraisHorsForfait_api: GsbFraishorsforfaitService, private router: Router) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    this.fraisHorsForfait_api.listeFraisHorsForfait(this.id_frais);
  }

  getListeFraisHorsForfait() {
    return this.fraisHorsForfait_api.appels_termines;
  }

  afficherDetailsFraisHf(id_fraishorsforfait: number){
    this.router.navigate(["fraisHF/affiche", id_fraishorsforfait]);
  }

  return() {
    this.all_service.return();
  }

  ajoutFraisHF(){
    this.router.navigate(["fraisHF/ajout", this.id_frais]);
  }

  deleteFraisHorsForfait(id_fraishorsforfait: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce frais HF ?');

    if (confirmation) {
      this.fraisHorsForfait_api.deleteFraisHorsForfait(id_fraishorsforfait).subscribe(
        () => {
        },
        error => {
          console.error("Erreur lors de l'appel API suppression frais HF :", error);
        }
      );
    }
  }
}
