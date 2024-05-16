import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { ModalService } from 'src/app/core/services/modal.service';

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
    public srvModal: ModalService
  ) {}
  mostrar!: boolean;

  ngOnInit() {
    this.mostrar = true;
    this.request = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 400);

    this.srvTickets.obtenerTickets({
      page: 1,
      limit: 10,
    });

    this.srvTickets.selectMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.metadata = res;
        this.currentPage = res.pagination.currentPage;
        this.verificarData();
      });
      console.log("Tickets",this.srvTickets.tickets)
  }
  verificarData() {
    if (this.srvTickets.metaData.pagination.total === 0) {
      this.isData = false;
    } else {
      this.isData = true;
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
  }
  buscarTicket(search: string) {
    console.log('buscar ticket');
  }
  filtrarTicket(filtro: string) {
    console.log('filtrar ticket');
  }

  verData(ticket: any, title: string, form: string) {
    console.log('ver data');
  }
  crearTicket(ticket: any, title: string, form: string) {
    console.log('crear ticket');
  }
}
