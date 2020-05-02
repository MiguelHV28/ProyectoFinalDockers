import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisesServices } from 'src/app/services/paises.service';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {
  paises: any = []
  
  constructor(private router:ActivatedRoute, private paisesSrv:PaisesServices) { 
    this.paisesSrv.getAll().subscribe((data:any[])=>{
      console.log(data);
      this.paises=data;
    }

    )
  }
  
  ngOnInit() {

  }

}
