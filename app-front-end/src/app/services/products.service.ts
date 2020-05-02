import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoM, Respuesta } from '../models/models';
import { Observable } from 'rxjs';

const URL_PRODUCTS='http://192.168.9.136:8001/products';
const URL_PRODUCTSCODIGO='http://192.168.9.136:8001/product/';
const URL_PRODUCTSCATEGORIA='http://192.168.9.136:8001/productsByCategoria/';
const URL_PRODUCTSBYDESCRIPCION='http://192.168.9.136:8001/productsByDescripcion/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { 


  }

  getAll(){
    return this.http.get(URL_PRODUCTS);
  }

  getCategory(category:string){
    return new Observable(observer=>{
      this.http.get(URL_PRODUCTSCATEGORIA+category).subscribe((data:Respuesta)=>{
        console.log("Console log Data.Result ",data.result.productos);
        const filter = data.result.productos;
        observer.next(filter);
      })
    });
  }

  getByCode(code:string){
    console.log(code);
    console.log(URL_PRODUCTSCODIGO+code);
    return new Observable(observer=>{
      this.http.get(URL_PRODUCTSCODIGO+code).subscribe((data:Respuesta)=>{
        console.log(data.result.productos);
        const filter =data.result.productos;
        observer.next(filter[0]);
      })
    });
  }

  getByDescription(description:string){
    return new Observable(observer=>{
      this.http.get(URL_PRODUCTSBYDESCRIPCION+description).subscribe((data:Respuesta)=>{
        console.log(data);
        const filter = data.result.productos;
        observer.next(filter);
      })
    });
  }
}
