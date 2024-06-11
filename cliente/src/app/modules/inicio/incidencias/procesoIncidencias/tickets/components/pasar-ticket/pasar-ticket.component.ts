import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pasar-ticket',
  templateUrl: './pasar-ticket.component.html',
  styleUrls: ['./pasar-ticket.component.css']
})
export class PasarTicketComponent implements OnInit {
  myForm!: FormGroup;
  isUsuarioSeleccionado: boolean = false;

  constructor(
    public srvUsuarios: UsuariosService,
    public srvTickets: TicketService,
    public fb: FormBuilder,
    private srvModal: ModalService
  ) {
    this.myForm = this.fb.group({
      observacion: [null, [Validators.required]],
      servicio: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      incidencia_nombre: [null, [Validators.required]],
      usuario: [{ value: null, disabled: true }, [Validators.required]], // Inicialmente deshabilitado
    });
  }

  searchTerm: string = ''; // Término de búsqueda actual
  suggestions: UsuariosModelBody[] = []; // Lista de sugerencias
  listaUsuarios: UsuariosModelBody[] = []; // Lista de usuarios
  verTicket!: any;
  private destroy$ = new Subject<any>();
  rol!: any;
  existeSolucion: boolean = false;
  sol!: any;

  ngOnInit() {
    this.verTicket = this.srvTickets.verTicket;
    this.srvTickets.selectSolucionTicketUsuario$.subscribe({
      next: (res) => {
        if (res.vacio) {
          console.log("no data")
        } else {
          this.sol = res.txt_ticket_usuario_solucion;
          this.comprobarSolucion();
        }
      }
    });
    console.log("solu",this.verTicket);
    this.myForm.controls['incidencia_nombre'].setValue(this.verTicket.tb_vulnerabilidade.str_vulnerabilidades_name);
    this.myForm.controls['incidencia_nombre'].disable();
    // Habilitar el campo de búsqueda si no hay usuarios seleccionados
    if (this.listaUsuarios.length === 0) {
      this.myForm.controls['usuario'].enable();
    }
    this.updateUsuarioState(); // Actualizar el estado del usuario seleccionado
    this.srvTickets.selectRol$.subscribe((res) => {
      this.rol = res;
    });
  }

  comprobarSolucion() {
    if(this.sol !== null){
      this.existeSolucion = true;
    }else{
      this.existeSolucion = false;
    }
  }

  updateUsuarioState() {
    this.isUsuarioSeleccionado = this.listaUsuarios.length > 0;
  }

  searchUsuario(event: any) {
    if (this.listaUsuarios.length > 0) {
      return; // Si ya hay un usuario seleccionado, no permitir buscar más
    }

    if (event.target.value !== '') {
      this.srvUsuarios.searchUsuario(event.target.value).subscribe(
        (data) => {
          this.suggestions = data.body;
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: UsuariosModelBody): void {
    this.searchTerm = ''; // Limpiar el término de búsqueda
    this.listaUsuarios.push(suggestion); // Agregar el usuario a la lista
    this.suggestions = []; // Limpiar las sugerencias

    // Completar el input con el nombre del usuario seleccionado
    this.myForm.controls['usuario'].setValue(
      `${suggestion.str_usuario_nombres} ${suggestion.str_usuario_apellidos}`
    );

    // Deshabilitar el campo de búsqueda de usuario
    this.myForm.controls['usuario'].disable();
    this.updateUsuarioState(); // Actualizar el estado del usuario seleccionado
  }

  eliminarUsuario(index: number): void {
    this.listaUsuarios.splice(index, 1); // Eliminar el usuario de la lista

    // Habilitar el campo de búsqueda de usuario si no hay usuarios seleccionados
    if (this.listaUsuarios.length === 0) {
      this.myForm.controls['usuario'].enable();
      this.myForm.controls['usuario'].setValue(''); // Limpiar el valor del input
    }
    this.updateUsuarioState(); // Actualizar el estado del usuario seleccionado
  }

  pasarTicket() {
    let ticketId = this.verTicket.int_ticket_id;
    let usuarioId = this.listaUsuarios[0].int_usuario_id;
    let ticketUsuarioId = this.verTicket.int_ticket_usuario_id;

    this.srvTickets.pasarTicket(ticketId, { ticketUsuarioId, usuarioId }).subscribe({
      next: (data) => {
        if (data.status) {
          Swal.fire({
            title: 'Ticket pasado con éxito',
            icon: 'success',
            text: data.message
          });
        } else {
          Swal.fire({
            title: 'Error al pasar ticket',
            icon: 'error',
            text: data.message
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.srvTickets.obtenerTickets({
          page: 1,
          limit: 10,
        });
        this.srvModal.closeModal();
        this.srvTickets.obtenerTicketsUsuario({
          page: 1,
          limit: 10,
          rol: this.rol
        });
      this.srvTickets.setIsTicketUsuario(true);
      }
    });
  }
}

