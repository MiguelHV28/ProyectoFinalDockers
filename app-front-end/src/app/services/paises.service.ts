import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_PAISES='https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})
export class PaisesServices{
    constructor(private http:HttpClient) { 


    }

    getAll(){
        return this.http.get(URL_PAISES);
      }
}
