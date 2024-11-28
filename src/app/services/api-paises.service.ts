import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPaisesService {

  constructor() {}

  async traerPaises() {
    try {
      const response: any = await fetch('https://restcountries.com/v3.1/all');
      const paises: any = await response.json();
      return paises;
    } catch (error) {
      console.error(error);
    }
  }
}
