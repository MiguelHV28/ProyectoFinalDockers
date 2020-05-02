import { Component, OnInit } from '@angular/core';
import { ProductModel, ProductoM } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  misdatos:ProductoM[]=[];

  constructor(private productsSrv:ProductsService) {
      // this.productsSrv.getAll().subscribe((data:ProductoM[])=>{
      //  this.misdatos=data;
      //})
   
      this.productsSrv.getCategory("Classic Cars").subscribe((data:ProductoM[])=>{
        this.misdatos=data;
        console.log("Item Filtrado",data);
      });
    //console.log('MISDATOS LEIDOS AFFUERA DEL GET|SUBSCRIBE',this.misdatos);
   }

  ngOnInit() {
  }

}
