import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GsbFraisService} from "../../../../service/gsb-frais.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Frais} from "../../../../metier/api-gsb/frais";
import {MenuComponent} from "../../../all/menu/menu.component";
import {CommonModule, Location} from "@angular/common";
import {GsbShortService} from "../../../../service/gsb-short.service";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {GsbAllService} from "../../../../service/gsb-all.service";

@Component({
  selector: 'app-affiche-frais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle],
  templateUrl: './affiche-frais.component.html',
  styleUrl: './affiche-frais.component.css'
})

export class AfficheFraisComponent {
  public id_frais: number = 0;
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');
  id_etat: FormControl = new FormControl('');

  constructor(private location: Location, route: ActivatedRoute, private frais_api: GsbFraisService, private etat_api: GsbShortService, private router: Router, private all_service: GsbAllService) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    this.frais_api.chargeFrais(this.id_frais).subscribe(
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
    this.all_service.return();
  }

  getFraisHorsForfait(id_frais: number) {
    this.router.navigate(['/fraisHF/liste/', id_frais]);
  }
}
