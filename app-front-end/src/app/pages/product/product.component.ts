import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductoM } from 'src/app/models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  misdatos: ProductoM={};
  category:string="";
  origen:string="";
  bCategory:boolean=false;
  bSearch:boolean=false;
  constructor(private router:ActivatedRoute, private productSvc: ProductsService) { 
    this.router.params.subscribe(params=>{
      const code=params['code'];
      this.category=params['category'];
      this.origen=params['origen'];

      if(this.origen=="categories"){
        this.bCategory=true;
      }else{
        this.bSearch=true;
      }

      console.log(this.origen);
      this.productSvc.getByCode(code).subscribe((data:ProductoM)=>{
        this.misdatos=data;
      })
    });
  }

  colorCategory(category:string){
      switch(category){
        case "Cars": "ligth-red";break;
        case "Buses": "ligth-yellow";break;
        case "Motorcycles": "ligth-gray";break;
        case "Planes": "ligth-blue";break;
        case "Ships": "ligth-pink";break;
        case "Trains": "ligth-purple";break;
      }
  }

  ngOnInit() {
  }

}
