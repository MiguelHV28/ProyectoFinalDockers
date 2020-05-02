import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductoM } from 'src/app/models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
misdatos: ProductoM[];
category:string="";
  constructor(private router:ActivatedRoute, private productSrv:ProductsService,private route2:Router) {
    this.router.params.subscribe(params =>{
      this.category=params['category'];
      this.productSrv.getCategory(this.category).subscribe((data:ProductoM[])=>{
          this.misdatos=data;
      });
      //console.log('PARAM: ',category);
    });
   }

   metodoCat(event:number){
     console.log(event);
     this.route2.navigate(['/home'])
   }

  ngOnInit() {
  }

}
