import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  placeholder: string = 'Buscar ticket ID';
  actualizarPaginacion: number = 0;
  estadoTicket!: string;

  loading: boolean = false;
  filtros: any[] = ['Finalizados', 'En proceso', 'Abiertos', 'Ver todo'];
  filtroActual: string = 'Ver todo';

  rol: any = '';

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
  getClass(estado: string): string {
    switch (estado) {
      case 'En Proceso':
        return 'en-proceso';
      case 'Finalizado':
        return 'finalizado';
      case 'Abierto':
        return 'abierto';
      default:
        return 'otro'; // clase por defecto si no coincide con ningún estado
    }
  }

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

    if (this.rol === 'Administrador') {
      this.infoAdmin();
    } else {
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
  infoUser(rol: any) {
    this.srvTickets.obtenerTicketsUsuario({
      page: 1,
      limit: 10,
      rol,
    });
    this.srvTickets.setIsTicketUsuario(true);
  }

  infoAdmin() {
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
    }
  }

  crearTickets() {

    this.mostrar = false;
  }

  guardar() {

    this.mostrar = true;
  }

  regresar() {

    this.mostrar = true;
  }
  changePage(page: number) {
    this.currentPage = page;
    //comprobar su se esta filtrando para cambiar de pagina
    switch (this.filtroActual) {
      case 'Finalizado':
        this.srvTickets.filtrarTicketsGeneral('Finalizado', page);
        break;
      case 'En Proceso':
        this.srvTickets.filtrarTicketsGeneral('En Proceso', page);
        break;
      case 'Abierto':
        this.srvTickets.filtrarTicketsGeneral('Abierto', page);
        break;
      case 'Ver todo' :
        this.srvTickets.obtenerTickets({
          page: page,
          limit: 10,
        });
        break;
      case '':
        this.srvTickets.obtenerTickets({
          page: page,
          limit: 10,
        });
    }
  }
  changePageUser(page: number) {
    this.currentPage = page;
    //comprobar su se esta filtrando para cambiar de pagina
    switch (this.filtroActual) {
      case 'Finalizado':
        this.srvTickets.filtrarTicketsUsuarioGeneral('Finalizado', page, this.rol);
        break;
      case 'En Proceso':
        this.srvTickets.filtrarTicketsUsuarioGeneral('En Proceso', page, this.rol);
        break;
      case 'Abierto':
        this.srvTickets.filtrarTicketsUsuarioGeneral('Abierto', page, this.rol);
        break;
      case 'Ver todo' :
        this.srvTickets.obtenerTicketsUsuario({
          page: page,
          limit: 10,
          rol: this.rol,
        });
        break;
      case '':
        this.srvTickets.obtenerTicketsUsuario({
          page: page,
          limit: 10,
          rol: this.rol,
        });
    }
  }
  buscarTicketUsuario(search: string) {
    //comprobar que solo sea numero el search
    if (isNaN(Number(search))) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Ingrese un número de ticket válido',
      });
      this.searchText = '';
      return;
    }

    //comprobar que ingrese un numero válido en el rango de un entero
    if (!this.isIntegerInRange(search)) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Ingrese un número de ticket válido',
      });
      this.searchText = '';
      return;
    }

    this.searchText = search;
    if (search != '') {
      Swal.fire({
        title: 'Buscando...',
        icon:'question',
        timer:500,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if(search===''){
      this.buscando=true;
      this.srvTickets.obtenerTicketsUsuario({
        page:1,
        limit:10,
        rol:this.rol
      })
      this.verificarData();
    }else{
      this.srvTickets.buscarTicketsUsuarioGeneral(search,1,this.rol)
      this.verificarData();
    }
  }
  filtrarTicketUsuario(filtro: string) {
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon:'success',
      timer:500,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    switch (filtro) {
      case 'Finalizados':
        this.filtroActual = 'Finalizado';
        this.srvTickets.filtrarTicketsUsuarioGeneral('Finalizado', 1, this.rol);
        this.verificarData();
        break;
      case 'En proceso':
        this.filtroActual = 'En Proceso';
        this.srvTickets.filtrarTicketsUsuarioGeneral('En Proceso', 1, this.rol);
        this.verificarData();
        break;
      case 'Abiertos':
        this.filtroActual = 'Abierto';
        this.srvTickets.filtrarTicketsUsuarioGeneral('Abierto', 1, this.rol);
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.srvTickets.obtenerTicketsUsuario({
          page: 1,
          limit: 10,
          rol: this.rol,
        });
        this.verificarData();
        break;
    }
  }


  isIntegerInRange = (value: string): boolean => {
    const num: number = Number(value);
    const INTEGER_MIN: number = -2147483648;
    const INTEGER_MAX: number = 2147483647;
    return Number.isInteger(num) && num >= INTEGER_MIN && num <= INTEGER_MAX;
};

  buscarTicket(search: string) {
    //comprobar que solo sea numero el search
    if (isNaN(Number(search))) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Ingrese un número de ticket válido',
      });
      this.searchText = '';
      return;
    }

    //comprobar que ingrese un numero válido en el rango de un entero
    if (!this.isIntegerInRange(search)) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Ingrese un número de ticket válido',
      });
      this.searchText = '';
      return;
    }

    this.searchText = search;
    if (search != '') {
      Swal.fire({
        title: 'Buscando...',
        icon:'question',
        timer:500,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if(search===''){
      this.buscando=true;
      this.srvTickets.obtenerTickets({
        page:1,
        limit:10
      })
      this.verificarData();
    }else{
      this.srvTickets.buscarTicketsGeneral(search,1)
      this.verificarData();
    }
  }
  filtrarTicket(filtro: string) {
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon:'success',
      timer:500,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    switch (filtro) {
      case 'Finalizados':
        this.filtroActual = 'Finalizado';
        this.srvTickets.filtrarTicketsGeneral('Finalizado', 1);
        this.verificarData();
        break;
      case 'En proceso':
        this.filtroActual = 'En Proceso';
        this.srvTickets.filtrarTicketsGeneral('En Proceso', 1);
        this.verificarData();
        break;
      case 'Abiertos':
        this.filtroActual = 'Abierto';
        this.srvTickets.filtrarTicketsGeneral('Abierto', 1);
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.srvTickets.obtenerTickets({
          page: 1,
          limit: 10,
        });
        this.verificarData();
        break;
    }

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

    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }
  editarTicket(ticket: any, title: string, form: string) {
    this.srvTickets.setEditarTicket(ticket);
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }
  traspasarTicket(ticket: any, title: string, form: string) {
    this.srvTickets.setVerTicket(ticket);
    this.srvTickets.obtenerTicketUsuarioById(ticket.int_ticket_usuario_id);
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  seguimiento(ticket: any) {
    this.srvTickets.obtenerSeguimiento(ticket.int_ticket_id);
    this.srvTickets.setSeguimientoTicketInfo(ticket);
  }

  finalizarTicket(ticket: any) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El ticket pasará a estado finalizado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvTickets
          .finalizarTicket(ticket.int_ticket_id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {

              if (res.status) {

                Swal.fire({
                  title: '¡Ha cambiado el estado del Ticket!',
                  icon: 'success',
                  text: res.message,
                });

              } else {
                Swal.fire({
                  title: '¡Error!',
                  icon: 'error',
                  text: res.message,
                });
              }
            },
            error: (err) => {
              Swal.fire('¡Error!', '', 'error');
            },
            complete: () => {
              this.ngOnInit();
            }
          });
      }
    });
  }
  soluciones = [];
  hasValidSoluciones: boolean = false;

  obtenerSoluciones(ticket: any) {
    this.srvTickets.obtenerSolucionesTicket(ticket.int_ticket_id);
  }
  enviarRevision(ticket: any) {

    this.srvTickets.getTicketUsuarioById(ticket.int_ticket_usuario_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {

        if(data.txt_ticket_usuario_solucion === null){
          Swal.fire({
            title: 'No se puede enviar a revisión',
            icon: 'warning',
            text: 'El ticket no tiene solución, por favor agregue una solución al ticket'
          });
        }else{
          //cambiar estado a 'PASADO'
          this.srvTickets.cambiarEstadoTicketUsuario(ticket.int_ticket_usuario_id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {

            },
            error: (err) => {
              console.log("error cambiar estado",err);
            }
          });
          this.srvTickets.enviarRevision(ticket.int_ticket_id);
          Swal.fire({
            title: 'Ticket enviado a revisión',
            icon: 'success',
            text: 'El ticket ha sido enviado a revisión'
          });
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al obtener ticket',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })

  }
}
