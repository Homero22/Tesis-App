import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, isEmpty, takeUntil } from 'rxjs';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import Swal from 'sweetalert2';
interface Usuario {
  int_usuario_id: number;
  str_usuario_nombres: string;
  str_usuario_apellidos: string;
  str_usuario_email: string;
  str_usuario_cedula: string;
  str_usuario_telefono: string;
  str_usuario_estado: string;
  dt_fecha_creacion: string;
  dt_fecha_actualizacion: string;
}

interface TicketUsuario {
  int_ticket_usuario_id: number;
  int_ticket_id: number;
  int_usuario_id: number;
  dt_fecha_creacion: string;
  dt_fecha_actualizacion: string;
  txt_ticket_usuario_solucion: string | null;
  str_ticket_usuario_estado: string;
  tb_usuario: Usuario;
}

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  private destroy$ = new Subject<any>();

  seguimiento: any[] = [];
  ticket: any;
  vulnerabilidad: any;
  ticketData: TicketUsuario[] = []; // Data del ticket
  selectedSolucion: string = '';

  isData: boolean = false;

  ticketSeleccionado!: any;
  dataCompleta!: any;
  constructor(
    private srvTickets: TicketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isData = false;

    this.srvTickets.selectSeguimientoTicket$.subscribe((res) => {
      if(!res.vacio){
        this.dataCompleta = res;
        this.seguimiento = res.body;
        this.vulnerabilidad = res.vulnerabilidad;
        this.ticket = res.ticket;
        this.isData= true;
      }else{
        this.isData = false;
      }
    });


  }
  isModalOpen: boolean = false;
  returnView(){
    this.router.navigate(['/incidencias/tickets']);
  }

  verSolucion(solucion: string) {
    this.selectedSolucion = solucion;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
