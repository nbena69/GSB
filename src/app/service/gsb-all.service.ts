import { Injectable } from '@angular/core';
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class GsbAllService {

  constructor(private location: Location) { }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return() {
    this.location.back();
  }
}
