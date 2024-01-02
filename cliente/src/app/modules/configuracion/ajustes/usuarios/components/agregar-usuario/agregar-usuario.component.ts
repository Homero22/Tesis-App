import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioCentralizadaModel } from 'src/app/core/models/usuarios/usuarioCentralizadaModel';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuariosModel';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  myForm!: FormGroup;
  dataForm!: FormGroup;
  request = false;
  loading = false;
  op = "Seleccione un rol"


  elementPagina: {
    dataLength:     number,
    metaData:       number,
    currentPage:    number
  } = {
    dataLength:     0,
    metaData:       0,
    currentPage:    0
  }

    currentPage = 1;
    metadata: any;
    mapFiltersToRequest: any = {};

  private destroy$ = new Subject<any>();


  constructor(
    public fb: FormBuilder,
    public srvUsuario: UsuariosService,
    public srvModal: ModalService,
    public srvRoles: RolesService
  ) {

    this.dataForm = this.fb.group({
      per_cedula:[
        null,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      per_telefono:[
        null,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
    })

    this.myForm = this.fb.group({

      per_cedula:[
          null,
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
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

  ngOnInit() {
  }


  //Obtener datos de la centralizada
  obtenerDatosCentralizada(cedula: string){
    this.limpiarFormulario();
    this.srvUsuario.getUsuarioCentralizada(cedula)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(usuario:UsuarioCentralizadaModel)=>{
        if(usuario.status){
          Swal.fire({
            title: 'Éxito',
            text: usuario.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.myForm.get('per_nombre')?.setValue(usuario.body.nombres);
          this.myForm.get('per_apellidos')?.setValue(usuario.body.apellidos);
          this.myForm.get('per_correo')?.setValue(usuario.body.correo);

          //deshabilitar campos
          this.myForm.get('per_nombre')?.disable();
          this.myForm.get('per_apellidos')?.disable();
          this.myForm.get('per_correo')?.disable();

        }else{
          Swal.fire({
            title: 'Error',
            text: usuario.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error:(error)=>{
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener datos del usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.log(error);
      }
    })



  }
  limpiarFormulario(){
    this.myForm.get('per_nombre')?.setValue('');
    this.myForm.get('per_apellidos')?.setValue('');
    this.myForm.get('per_correo')?.setValue('');
    this.myForm.get('per_telefono')?.setValue('');
    this.myForm.get('roles')?.setValue('');
  }

  onSubmit(){
    console.log(this.myForm.value);
    //extraigo la cedula del formulario
    let cedula = this.myForm.get('per_cedula')?.value;
    this.obtenerDatosCentralizada(cedula);
  }

//Agregar usuario
  agregarUsuario(){
    let cedula = this.myForm.get('per_cedula')?.value;
    let telefono = this.myForm.get('per_telefono')?.value;
    let idRol = this.myForm.get('roles')?.value;
    console.log("idRol",idRol);
    Swal.fire({
      title: 'Cargando...',
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.srvUsuario.crearUsuario(cedula,telefono,idRol)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(usuario: UsuarioModel)=>{
        if(usuario.status){
          Swal.fire({
            title: 'Éxito',
            text: usuario.message,
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: `Crear otro`,
            denyButtonText: `Cerrar ventana`,
          }).then((result)=>{
            if(result.isConfirmed){
              this.srvUsuario.obtenerUsuarios({
                page:1,
                limit:10
              })
              this.myForm.reset();
            }else{
              this.myForm.reset();
              this.srvModal.closeModal();
              this.srvUsuario.obtenerUsuarios({
                page:1,
                limit:10
              })
            }
          }
          );
        }else{
          Swal.fire({
            title: 'Error',
            text: usuario.message,
            icon: 'error',
            showDenyButton: true,
            confirmButtonText: `Reintentar`,
            denyButtonText: `Cerrar ventana`,
          }).then((result)=>{
            if(!result.isConfirmed){
              this.srvUsuario.obtenerUsuarios({
                page:1,
                limit:10
              })
              this.myForm.reset();
              this.srvModal.closeModal();
            }else{
              this.srvUsuario.obtenerUsuarios({
                page:1,
                limit:10
              })
            }
          }
          );
        }
      },
      error:(error)=>{
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar el usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    })

  }








}
