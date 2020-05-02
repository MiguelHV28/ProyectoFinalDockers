import { Component, OnInit } from '@angular/core';
import { ProductoM } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  misdatos:ProductoM[]=[];

  constructor(private productsSrv:ProductsService) {
    // this.productsSrv.getAll().subscribe((data:ProductoM[])=>{
    //  this.misdatos=data;
    //})
 
    this.productsSrv.getCategory("Cars").subscribe((data:ProductoM[])=>{
      this.misdatos=data;
      console.log("Item Filtrado",data);
    });
  //console.log('MISDATOS LEIDOS AFFUERA DEL GET|SUBSCRIBE',this.misdatos);
 }

  ngOnInit() {
  }

}
