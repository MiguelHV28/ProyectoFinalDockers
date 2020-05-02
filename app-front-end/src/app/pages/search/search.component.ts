import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductoM } from 'src/app/models/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  misdatos:ProductoM[];
  criterio:string="";
  constructor(private router:ActivatedRoute, private productSvc:ProductsService,private route2:Router) {
    this.router.params.subscribe(params=>{
      this.criterio=params['criterio'];
      this.productSvc.getByDescription(this.criterio).subscribe((data:ProductoM[])=>{
          this.misdatos=data;
          console.log(this.criterio);
          console.log(this.misdatos);
      });
    })
   }

  ngOnInit() {
  }

  metodoCat(event:number){
    console.log(event);
    this.route2.navigate(['/about'])
  }

}
