import { Component } from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../all/menu/menu.component";
import {GsbFraishorsforfaitService} from "../../../service/gsb-fraishorsforfait.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Frais} from "../../../metier/frais";
import {Fraishorsforfait} from "../../../metier/fraishorsforfait";

@Component({
  selector: 'app-affiche-fraishorsforfait',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './affiche-fraishorsforfait.component.html',
  styleUrl: './affiche-fraishorsforfait.component.css'
})
export class AfficheFraishorsforfaitComponent {
  public id_fraishorsforfait: number = 0;
  public id_frais: number = 0;
  date_fraishorsforfait: FormControl = new FormControl('');
  montant_fraishorsforfait: FormControl = new FormControl('');
  lib_fraishorsforfait: FormControl = new FormControl('');

  constructor(private location:Location, route: ActivatedRoute, private fraishorsforfait_api: GsbFraishorsforfaitService, private router: Router) {
    this.id_fraishorsforfait = parseInt(route.snapshot.paramMap.get('id_fraishorsforfait')!);
    this.fraishorsforfait_api.chargeFraisHorsForfait(this.id_fraishorsforfait).subscribe(
      data => {
        let fraishorsforfait = new Fraishorsforfait(data);
        this.date_fraishorsforfait.setValue(fraishorsforfait.date_fraishorsforfait);
        this.montant_fraishorsforfait.setValue(fraishorsforfait.montant_fraishorsforfait);
        this.lib_fraishorsforfait.setValue(fraishorsforfait.lib_fraishorsforfait);
        this.id_frais = fraishorsforfait.id_frais;
        console.log(this.id_frais);
      },
      error => console.log('Erreur Appel API')
    );
  }

  return() {
    this.location.back();
  }

  deleteFraisHorsForfait(id_fraishorsforfait: number) {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce frais HF ?');

    if (confirmation) {
      this.fraishorsforfait_api.deleteFraisHorsForfait(id_fraishorsforfait).subscribe(
        () => {
          console.log("Appel API suppression frais HF réussi");
          this.return();
        },
        error => {
          console.error("Erreur lors de l'appel API suppression frais HF :", error);
        }
      );
    }
  }

  onSubmitFicheFraisHorsForfait()
  {
    this.fraishorsforfait_api.updateFraisHorsForfait(
      this.id_fraishorsforfait.valueOf(),
      this.id_frais,
      this.date_fraishorsforfait.value,
      this.montant_fraishorsforfait.value,
      this.lib_fraishorsforfait.value
    );
  }
}
