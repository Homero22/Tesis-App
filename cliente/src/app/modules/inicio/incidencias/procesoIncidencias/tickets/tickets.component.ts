import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor() { }
  mostrar!:boolean;

  ngOnInit() {
    this.mostrar=true;
  }

  crearTickets(){
    console.log('crear ticket');
    this.mostrar=false;
  }

  guardar(){
    console.log('guardar');
    this.mostrar=true;
  }

  regresar(){
    console.log('regresar');
    this.mostrar=true;
  }


}
