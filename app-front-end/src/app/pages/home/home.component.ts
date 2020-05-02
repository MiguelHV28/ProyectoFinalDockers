import { Component, OnInit } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { 
    PNotifyButtons; // Initiate the module. Important!
    PNotify.alert({
      title:"Notificación exitosa",
      text:"Texto a mostrar",
      animation:"fade",
      icon:"icon-bell-checkk",
      addClass:"alert alert-success",
      shadow:true,
      hide:true,
      delay:1000 * 4,
      type:'success'
    });
  }

  ngOnInit() {
  }

}
