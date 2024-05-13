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
import {ActiviteCompl} from "../../../../metier/api-gsb/activite-compl";

@Component({
  selector: 'app-affiche-activite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, MatIcon, MatTableModule, MatButtonModule, MatFormField, MatLabel, MatSelect, MatOption, MatDialogModule, MatCardTitle, MatList, MatListItem, ErrorMessageComponent],
  templateUrl: './affiche-activite.component.html',
  styleUrl: './affiche-activite.component.css'
})
export class AfficheActiviteComponent {
  public id_activite: number = 0;
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
      });
    });
    this.id_activite = parseInt(route.snapshot.paramMap.get('id_activite')!);
    this.activite_api.chargeActivite(this.id_activite).subscribe(
      data => {
        let activiteCompl = new ActiviteCompl(data);
        this.date_activite.setValue(activiteCompl.date_activite);
        this.lieu_activite.setValue(activiteCompl.lieu_activite);
        this.theme_activite.setValue(activiteCompl.theme_activite);
        this.motif_activite.setValue(activiteCompl.motif_activite);
      },
      error => console.log('Erreur Appel API')
    );
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
