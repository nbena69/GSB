import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {GsbFraisService} from "../../../service/gsb-frais.service";
import {ActivatedRoute} from "@angular/router";
import {Frais} from "../../../metier/frais";

@Component({
  selector: 'app-affiche-frais',
  standalone: true,
  imports: [],
  templateUrl: './affiche-frais.component.html',
  styleUrl: './affiche-frais.component.css'
})
export class AfficheFraisComponent {
  public id_frais: number = 0;
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');

  constructor(route: ActivatedRoute, private frais_api: GsbFraisService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    console.log(this.id_frais);
    this.frais_api.chargeFrais(this.id_frais).
      subscribe(
        data => {
          let frais = new Frais(data);
          this.anneemois.setValue(frais.anneemois);
          this.nbjustificatifs.setValue(frais.nbjustificatifs);
          this.montantvalide.setValue(frais.montantvalide);
        },
      error => console.log('Erreur Appel API')
    );
  }


}
