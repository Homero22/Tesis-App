import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioRolService } from 'src/app/core/services/Usuarios/usuarioRol.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-perfiles',
  templateUrl: './agregar-perfiles.component.html',
  styleUrls: ['./agregar-perfiles.component.css']
})
export class AgregarPerfilesComponent implements OnInit {


  myForm!: FormGroup;
  selectedRol!: any;

  constructor(
    public srvRoles : RolesService,
    public fb: FormBuilder,
    public srvUsuarioRol: UsuarioRolService,
    public srvModal : ModalService
  ) {
    this.myForm = this.fb.group({

      int_per_id:[
        '',
      ],
        str_rol_nombre:[
        'Seleccione un Rol',
        [Validators.required, this.validateRol]
      ],

      });

  }

    // Validador personalizado para asegurarse de que se haya seleccionado un rol válido
    validateRol(control: any) {
      const selectedRol = control.value;
      return selectedRol !== 'Seleccione un Rol' ? null : { invalidRol: true };
    }


    // Función para manejar el cambio de selección en el select
    onRolChange() {
      this.selectedRol = this.myForm.get('str_rol_nombre')?.value;
    }

  ngOnInit() {

  }
  // Función para manejar la adición del perfil
  addProfile() {



    // Llamar al servicio para crear el usuarioRol
    //this.srvUsuarioRol.crearUsuarioRol(this.selectedRol.int_rol_id, this.srvUsuarioRol.usuariosRoles[0].int_usuario_id)

    Swal.fire({
      title:"Está seguro de agregar este Rol al usuario?",
      showDenyButton: true,
      confirmButtonText: `Agregar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.srvUsuarioRol.crearUsuarioRol(this.selectedRol.int_rol_id, this.srvUsuarioRol.usuariosRoles[0].int_usuario_id)
        .subscribe({
          next:(data:any)=>{
            if(data.status){
              Swal.fire({
                title: 'Rol agregado con éxito',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
            }else{
              Swal.fire({
                title: 'Ha ocurrido un error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          },
          error:(err:any)=>{
            Swal.fire({
              title: 'Ha ocurrido un error',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
          complete:()=>{
            this.srvModal.closeModal();
            this.srvUsuarioRol.obtenerUsuarioRoles(this.srvUsuarioRol.usuariosRoles[0].int_usuario_id);
          }
        });
      }
    }
    );



  }

}
