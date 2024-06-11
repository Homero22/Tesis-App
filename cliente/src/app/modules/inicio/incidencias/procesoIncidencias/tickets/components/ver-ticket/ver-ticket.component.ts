import { TicketModelBody } from './../../../../../../../core/models/incidencias/ticketModel';
import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';

@Component({
  selector: 'app-ver-ticket',
  templateUrl: './ver-ticket.component.html',
  styleUrls: ['./ver-ticket.component.css']
})
export class VerTicketComponent implements OnInit {

  ticket! :any;
  isTicketUsuario: boolean = false;
  soluciones: any;
  isData: boolean = false;
  hasValidSoluciones: boolean = false;



  constructor(private srvTicket: TicketService) {}

  ngOnInit(): void {
    this.ticket = this.srvTicket.verTicket;
    this.srvTicket.selectIsTicketUsuario$.subscribe((data) => {
      this.isTicketUsuario = data;
    });

    this.srvTicket.selectSolucionesTicket$.subscribe((data) => {
      if(data && data.body){
        this.soluciones = data.body
        this.isData = true
        this.hasValidSoluciones = this.soluciones.some((solucion: any) => solucion.txt_ticket_usuario_solucion);
      }else{
        this.soluciones = []
        this.isData = false
        this.hasValidSoluciones = false
      }

    });

  }

}
