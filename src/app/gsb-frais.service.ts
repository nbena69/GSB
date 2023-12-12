import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frais } from './frais';

@Injectable({
  providedIn: 'root'
})
export class GsbFraisService {
  private apiUrl = 'http://gsb.benaissa.etu.lmdsio.com/api/frais';

  constructor(private http: HttpClient) { }

  getAllFrais(): Observable<Frais[]> {
    return this.http.get<Frais[]>(this.apiUrl);
  }

  deleteFrais(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
