import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ActiviteCompl} from "../metier/activite-compl";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GsbActiviteService {
  private Url = 'http://localhost/benaissa/GsbFrais/public/api';
  private httpUrl = "http://gsb.benaissa.etu.lmdsio.com/api";

  private activite: ActiviteCompl = new ActiviteCompl;
  private _reponses = new BehaviorSubject<ActiviteCompl[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeActivite: ActiviteCompl[] = [];
  public dataStore: { activite: ActiviteCompl[] } = {activite: []};

  constructor(private http: HttpClient) { }
}
