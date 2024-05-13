import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Adresse} from "../../metier/api-ban/adresse";

@Injectable({
  providedIn: 'root'
})
export class BanService {

  constructor(private http: HttpClient) { }

  searchAddress(query: string): Observable<Adresse[]> {
    const params = new HttpParams().set('q', query);

    return this.http.get<any>('https://api-adresse.data.gouv.fr/search/', { params }).pipe(
      map((response: any) => {
        return response.features.map((feature: any) => new Adresse(feature));
      })
    );
  }
}
