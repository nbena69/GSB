import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbFraisService} from "../../../service/gsb-frais.service";
import {ActivatedRoute} from "@angular/router";
import {Frais} from "../../../metier/frais";
import {MenuComponent} from "../../menu/menu.component";
import { CommonModule, Location } from "@angular/common";
import {GsbEtatService} from "../../../service/gsb-etat.service";
import {Etat} from "../../../metier/etat";


@Component({
  selector: 'app-affiche-frais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './affiche-frais.component.html',
  styleUrl: './affiche-frais.component.css'
})

export class AfficheFraisComponent {
  public id_frais: number = 0;
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');
  id_etat: FormControl = new FormControl('');

  constructor(private location: Location, route: ActivatedRoute, private frais_api: GsbFraisService, private etat_api: GsbEtatService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    console.log(this.id_frais);
    this.frais_api.chargeFrais(this.id_frais).
      subscribe(
        data => {
          let frais = new Frais(data);
          this.anneemois.setValue(frais.anneemois);
          this.nbjustificatifs.setValue(frais.nbjustificatifs);
          this.montantvalide.setValue(frais.montantvalide);
          this.id_etat.setValue(frais.id_etat);
        },
      error => console.log('Erreur Appel API')
    );
    this.etat_api.getListeEtats();
    console.log(this.getListeEtat())
  }

  getListeEtat() {
    return this.etat_api.appels_terminesEtat;
  }


  onSubmitFicheFrais() {
    this.frais_api.updateFrais(
      this.id_frais.valueOf(),
      this.anneemois.value,
      this.nbjustificatifs.value,
      this.montantvalide.value,
      this.id_etat.value
    );
  }

  return() {
    this.location.back();
  }

  getFraisHorsForfait() {

  }
}
