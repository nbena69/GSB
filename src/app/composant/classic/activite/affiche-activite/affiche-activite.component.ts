import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "../../../all/menu/menu.component";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {ErrorMessageComponent} from "../../../all/error-message/error-message.component";
import {Subscription} from "rxjs";
import {Adresse} from "../../../../metier/api-ban/adresse";
import {GsbAllService} from "../../../../service/gsb-all.service";
import {ActivatedRoute} from "@angular/router";
import {GsbActiviteService} from "../../../../service/service-gsb/gsb-activite.service";
import {BanService} from "../../../../service/service-ban/ban.service";
import {Frais} from "../../../../metier/api-gsb/frais";

@Component({
  selector: 'app-affiche-activite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle, MatList, MatListItem, ErrorMessageComponent],
  templateUrl: './affiche-activite.component.html',
  styleUrl: './affiche-activite.component.css'
})
export class AfficheActiviteComponent {
  date_activite: FormControl = new FormControl('');
  lieu_activite: FormControl = new FormControl('');
  theme_activite: FormControl = new FormControl('');
  motif_activite: FormControl = new FormControl('');
  addressSubscription: Subscription;
  adresses: Adresse[] = [];
  errorMessage: string | null = null;

  constructor(private all_service: GsbAllService, route: ActivatedRoute, private activite_api: GsbActiviteService, private banService: BanService) {
    this.addressSubscription = this.lieu_activite.valueChanges.subscribe(value => {
      this.banService.searchAddress(value).subscribe(addresses => {
        // Traiter les adresses retournées
        // Par exemple, vous pouvez mettre à jour une liste d'autocomplétion avec les adresses retournées
      });
    });
    /*
    this.activite_api.chargeActivite(this.id_frais).subscribe(
      data => {
        let frais = new Frais(data);
        this.anneemois.setValue(frais.anneemois);
        this.nbjustificatifs.setValue(frais.nbjustificatifs);
        this.montantvalide.setValue(frais.montantvalide);
        this.id_etat.setValue(frais.id_etat);
      },
      error => console.log('Erreur Appel API')
    );*/
  }

  searchAddress() {
    const query = this.lieu_activite.value;
    if (query) {
      this.banService.searchAddress(query).subscribe((addresses: Adresse[]) => {
        this.adresses = addresses;
      });
    } else {
      this.adresses = [];
    }
  }

  selectAddress(address: Adresse) {
    this.lieu_activite.setValue(address.label);
    this.adresses = [];
  }

  return() {
    this.all_service.return();
  }

  onSubmitAjoutActivite() {

  }
}
