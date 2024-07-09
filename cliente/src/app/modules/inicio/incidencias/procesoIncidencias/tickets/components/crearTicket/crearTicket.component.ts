import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { ServiciosService } from 'src/app/core/services/incidencias/servicios.service';
import { EstadosService } from 'src/app/core/services/incidencias/estados.service';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import Swal from 'sweetalert2';
import { IncidenciasModelBody } from 'src/app/core/models/incidencias/incidenciasModel';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-crearTicket',
  templateUrl: './crearTicket.component.html',
  styleUrls: ['./crearTicket.component.css']
})
export class CrearTicketComponent implements OnInit {
  myForm!: FormGroup;
  searchTerm: string = '';
  suggestions: UsuariosModelBody[] = [];
  usuarioSeleccionado: UsuariosModelBody | null = null;
  incidencia!: IncidenciasModelBody;

  constructor(
    public fb: FormBuilder,
    public srvUsuarios: UsuariosService,
    public srvServicios: ServiciosService,
    public srvEstados: EstadosService,
    public srvIncidencias: IncidenciasService,
    private srvTicket: TicketService,
    private srvModal: ModalService
  ) {
    this.myForm = this.fb.group({
      observacion: [null, [Validators.required]],
      servicio: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      incidencia_nombre: [null, [Validators.required]],
      usuario: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.srvEstados.obtenerAllEstados();
    this.srvServicios.obtenerAllServicios();
    this.incidencia = this.srvIncidencias.verIncidencia;
    this.myForm.patchValue({
      incidencia_nombre: this.incidencia.str_vulnerabilidades_name
    });
  }

  searchUsuario(event: any) {
    if (event.target.value !== '') {
      this.srvUsuarios.searchUsuario(event.target.value).subscribe((data) => {
        this.suggestions = data.body;
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: UsuariosModelBody): void {
    this.usuarioSeleccionado = suggestion;
    this.myForm.patchValue({ usuario: `${suggestion.str_usuario_nombres} ${suggestion.str_usuario_apellidos}` });
    this.suggestions = [];
  }

  eliminarUsuario(): void {
    this.usuarioSeleccionado = null;
    this.myForm.patchValue({ usuario: '' });
  }

  agregarTicket() {
    if (!this.usuarioSeleccionado) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un responsable',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    let ticket = {
      str_ticket_observacion: this.myForm.value.observacion,
      int_servicio_id: this.myForm.value.servicio,
      int_estado_id: this.myForm.value.estado,
      int_vulnerabilidades_id: this.incidencia.int_vulnerabilidades_id,
      str_ticket_usuario: this.usuarioSeleccionado
    };

    this.srvTicket.crearTicket(ticket).subscribe({
      next: (res: any) => {
        if (res.status) {
          Swal.fire({
            title: 'Ticket agregado',
            icon: 'success',
            showDenyButton: false,
            confirmButtonText: 'Aceptar',
          });
          this.myForm.reset();
          this.usuarioSeleccionado = null;
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el ticket',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
      complete: () => {
        this.srvIncidencias.obtenerIncidencias({ page: 1, limit: 10 });
        this.srvModal.closeModal();
      }
    });
  }

  previsualizarTicket() {

  }
}
