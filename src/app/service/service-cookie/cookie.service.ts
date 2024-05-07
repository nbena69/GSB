import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) { }

  // Méthode pour stocker un cookie
  setCookie(key: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'Strict' | 'None') {
    this.ngxCookieService.set(key, value, expires, path, domain, secure, sameSite);
  }

  // Méthode pour récupérer la valeur d'un cookie
  getCookie(key: string): string {
    return this.ngxCookieService.get(key);
  }

  // Méthode pour supprimer un cookie
  deleteCookie(key: string, path?: string, domain?: string) {
    this.ngxCookieService.delete(key, path, domain);
  }
}
