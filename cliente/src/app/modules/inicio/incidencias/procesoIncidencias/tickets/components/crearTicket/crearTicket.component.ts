import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { ServiciosService } from '../../../../../../../core/services/incidencias/servicios.service';
import { ServicioEditadoModel } from '../../../../../../../core/models/incidencias/servicios';
import { EstadosService } from 'src/app/core/services/incidencias/estados.service';
import { IncidenciasService } from '../../../../../../../core/services/incidencias/incidencias.service';
import { IncidenciasModel, IncidenciasModelBody } from 'src/app/core/models/incidencias/incidenciasModel';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearTicket',
  templateUrl: './crearTicket.component.html',
  styleUrls: ['./crearTicket.component.css']
})
export class CrearTicketComponent implements OnInit {
  myForm!: FormGroup;
  dataForm!: FormGroup;
  incidencia!: IncidenciasModelBody;



  public isLoading = false;
  public src!: string;
  public usuarioS: String = '';

  constructor(
    public fb: FormBuilder,
    public srvUsuarios: UsuariosService,
    public srvServicios: ServiciosService,
    public srvEstados: EstadosService,
    public srvIncidencias: IncidenciasService,
    private srvTicket: TicketService
  ) {


    this.myForm = this.fb.group({

      observacion:[
          null,
          [Validators.required],
        ],
      servicio:[
          null,
          [Validators.required],
        ],
      estado:[  null,
          [Validators.required],
        ],
      incidencia_nombre:[
          null,
          [Validators.required],
        ],
      usuario:[
          null,
          [Validators.required],
        ],
    });

   }
   searchTerm: string = ''; // Término de búsqueda actual
   suggestions: UsuariosModelBody[] = []; // Lista de sugerencias
   listaUsuarios: UsuariosModelBody[] = []; // Lista de usuarios



  selectSuggestion(suggestion: UsuariosModelBody): void {
    this.searchTerm = ''; // Limpiar el término de búsqueda
    //limpiar el input

    this.listaUsuarios.push(suggestion); // Agregar el usuario a la lista
    this.suggestions = []; // Limpiar las sugerencias
  }
  eliminarUsuario(index: number): void {
    this.listaUsuarios.splice(index, 1); // Eliminar el usuario de la lista
  }
  searchUsuario (event:any){
    if (event.target.value != '') {
      this.srvUsuarios.searchUsuario(event.target.value).subscribe(
        (data)=>{
          this.suggestions = data.body;
        }
      );
    }
    this.suggestions = [];
  }


  ngOnInit() {
    this.srvEstados.obtenerAllEstados();
    this.srvServicios.obtenerAllServicios();
    this.incidencia = this.srvIncidencias.verIncidencia;
    //poner el nombre de la incidencia en el input del formulario
    this.myForm.patchValue({
      incidencia_nombre: this.incidencia.str_vulnerabilidades_name
    });

  }

  onSubmit(){

  }


  agregarTicket(){
    console.log("Agregar ticket");
    let ticket = {
      str_ticket_observacion: this.myForm.value.observacion,
      int_servicio_id: this.myForm.value.servicio,
      int_estado_id: this.myForm.value.estado,
      int_vulnerabilidades_id: this.incidencia.int_vulnerabilidades_id,
      str_ticket_usuario: this.listaUsuarios
    }

    this.srvTicket.crearTicket(ticket).subscribe({
      next:(res:any)=>{
        if(res.status){
          Swal.fire({
            title: 'Ticket agregado',
            icon: 'success',
            showDenyButton: false,
            confirmButtonText: 'Aceptar',
          });
          this.myForm.reset();
          this.listaUsuarios = [];

        }else{
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });

        }
      },
      error:(err:any)=>{
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el ticket',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
    },
    complete:()=>{
      this.srvIncidencias.obtenerIncidencias({
        page:1,
        limit:10
      });
    }
    });
  }
  previsualizarTicket(){
    console.log("Previsualizar",this.myForm.value);
  }
  obtenerUsuario(_searchValue: string) {
  }






}
