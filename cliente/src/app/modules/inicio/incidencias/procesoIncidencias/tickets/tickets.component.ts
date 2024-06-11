import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  currentPage: number = 1;
  metadata!: DataMetadata;
  total!: number;
  status!: boolean;
  isData: boolean = false;
  isLoading: boolean = true;
  buscando: boolean = false;
  filtrando: boolean = false;
  searchText: string = '';
  placeholder: string = 'Buscar ticket';
  actualizarPaginacion: number = 0;

  loading: boolean = false;
  filtros: any[] = ['Protocolo TCP', 'Ver  inactivos'];
  filtroActual: string = 'Ver todo';


  rol: any='';

  private destroy$ = new Subject<any>();
  request = false;
  myform!: FormGroup;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  constructor(
    public srvTickets: TicketService,
    public srvModal: ModalService,
    private router: Router
  ) {}
  mostrar!: boolean;

  ngOnInit() {
    //cargando
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

   this.srvTickets.selectRol$.subscribe((res) => {
      this.rol = res;
    });
   this.srvTickets.setRol(this.rol);
    this.mostrar = true;
    this.request = true;

    if(this.rol === 'Administrador'){
      this.infoAdmin();
    }else{
      this.infoUser(this.rol);
    }
    this.srvTickets.selectMetadata$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      this.metadata = res;
      this.currentPage = res.pagination.currentPage;
      this.verificarData();
    });


  }
  infoUser(rol:any){

      this.srvTickets.obtenerTicketsUsuario({
        page: 1,
        limit: 10,
        rol
      });
    this.srvTickets.setIsTicketUsuario(true);


  }

  infoAdmin(){
    this.srvTickets.obtenerTickets({
      page: 1,
      limit: 10,
    });

  }


  verificarData() {
    if (this.srvTickets.metaData.pagination.total === 0) {
      this.isData = false;
    } else {
      this.isData = true;
      //cerrar
      Swal.close();
    }
  }

  crearTickets() {
    console.log('crear ticket');
    this.mostrar = false;
  }

  guardar() {
    console.log('guardar');
    this.mostrar = true;
  }

  regresar() {
    console.log('regresar');
    this.mostrar = true;
  }
  changePage(page: number) {
    this.currentPage = page;
    this.srvTickets.obtenerTickets({
      page: page,
      limit: 10,
    });
  }
  buscarTicket(search: string) {
    console.log('buscar ticket');
  }
  filtrarTicket(filtro: string) {
    console.log('filtrar ticket');
  }

  verData(ticket: any, title: string, form: string, numeroTicket: number) {

    ticket.numeroTicket = numeroTicket;
    this.srvTickets.setVerTicket(ticket);
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
    this.srvTickets.obtenerSolucionesTicket(ticket.int_ticket_id);
  }
  agregarSolucionTicket(ticket: any, title: string, form: string) {

    this.srvTickets.setAddSolucionTicket(ticket);
    this.srvTickets.obtenerTicketUsuarioById(ticket.int_ticket_usuario_id);

    this.elementForm={
      formulario: form,
      title: title,
      special: false,
    }
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }
  editarTicket(ticket: any, title: string, form: string) {
    this.srvTickets.setEditarTicket(ticket);
    this.elementForm={
      formulario: form,
      title: title,
      special: false,
    }
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }
  traspasarTicket(ticket: any, title: string, form: string) {
    this.srvTickets.setVerTicket(ticket);
    this.srvTickets.obtenerTicketUsuarioById(ticket.int_ticket_usuario_id);
    this.elementForm={
      formulario: form,
      title: title,
      special: false,
    }
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  seguimiento(ticket: any){
    this.srvTickets.obtenerSeguimiento(ticket.int_ticket_id);
  }
}
