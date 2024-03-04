import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';

@Component({
  selector: 'app-crearTicket',
  templateUrl: './crearTicket.component.html',
  styleUrls: ['./crearTicket.component.css']
})
export class CrearTicketComponent implements OnInit {
  myForm!: FormGroup;
  dataForm!: FormGroup;



  public isLoading = false;
  public src!: string;
  public usuarioS: String = '';

  constructor(
    public fb: FormBuilder,
    public srvUsuarios: UsuariosService
  ) {


    this.myForm = this.fb.group({

      per_cedula:[
          null,
        ],
        per_telefono:[
          null,
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        per_nombre:[
          null,     [Validators.required],
        ],
        per_apellidos:[
          null,     [Validators.required],
        ],
        per_correo:[
          null,     [Validators.required],
        ],
        roles:[
          null,     [Validators.required],
        ]
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
  }

  onSubmit(){

  }


  agregarTicket(){

  }
  obtenerUsuario(_searchValue: string) {
  }






}
