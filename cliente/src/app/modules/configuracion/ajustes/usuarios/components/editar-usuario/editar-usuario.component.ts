import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { UsuariosComponent } from '../../usuarios.component';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { UsuarioModel, UsuariosModel} from 'src/app/core/models/usuarios/usuariosModel';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  idUser: number = 0;
  component!: UsuariosComponent;
  request = false;

  constructor(
    public fbUsuario:FormBuilder,
    public srvUsuario: UsuariosService,
    public srvModal: ModalService,

  ) {
    this.myForm = this.fbUsuario.group({
      id: ['',[]],
      nombre: [''],
      apellido: [''],
      telefono: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)],],
      correo: [''],
      estado: [''],
    }
    );
  }

  ngOnInit() {
    this.completeForm();
    this.myForm.controls['nombre'].disable();
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  completeForm(){
    this.srvModal.selectIdUsuario$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(idUser:number)=>{
            this.idUser = idUser;
            this.showLoadingMessage();
            this.getUsuario();
          },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  getUsuario(){
    this.srvUsuario.getUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(res:UsuarioModel)=>{
        this.myForm = this.fbUsuario.group({
          id: [res.body.int_usuario_id,[Validators.required]],
          nombre: [res.body.str_usuario_nombres,[Validators.required]],
          apellido: [res.body.str_usuario_apellidos,[Validators.required]],
          telefono: [res.body.str_usuario_telefono,[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
          correo: [res.body.str_usuario_email,[Validators.required]],
          estado: [res.body.str_usuario_estado,[Validators.required]],
        });
        //desabilitar campos
        this.myForm.controls['nombre'].disable();
        this.myForm.controls['apellido'].disable();
        this.myForm.controls['correo'].disable();
        this.myForm.controls['estado'].disable();

      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        // Swal.close();
      }
    })
  }

  showLoadingMessage() {
    Swal.fire({
      // title: 'Espere',
      text: 'Cargando Información',
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 800,
    });
  }

  modifyUsuario(){
    Swal.fire({
      title:'¿Está seguro que desea modificar a este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
      // allowOutsideClick:false,
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire({
          title:'Espere',
          text:'Modificando Usuario',
          icon:'info',
           allowOutsideClick:false,
          didOpen:()=>{
            Swal.showLoading();
          }

        });
        setTimeout(() => {
          this.srvUsuario.editarUsuario(this.myForm.value.id,this.myForm.value.telefono)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next:(res:any)=>{
              if(res.status){
                Swal.close();
                Swal.fire({
                title:'Usuario Modificado',
                text:'Usuario Modificado Correctamente',
                icon:'success',
                confirmButtonText: 'Aceptar',
              });
            }else{
              Swal.close();
              Swal.fire({
                title:'Error',
                text:'Error al modificar el usuario',
                icon:'error',
                confirmButtonText: 'Aceptar',
              });
            }
            },
            error:(err:any)=>{
              console.log("err: ",err);
              Swal.close();
              this.request = false;
              Swal.fire({
                title:'Error',
                text:'Error al modificar el usuario: ' + err,
                icon:'error',
                confirmButtonText: 'Aceptar',
              });
            },
            complete:()=>{
              this.srvModal.closeModal();
              this.myForm.reset();
              this.request = false;
              this.getUsuariosActualizar();
            }
          });
        }, 1000);
      }

    });
  }

  getUsuariosActualizar(){
    Swal.fire({
      title: 'Cargando...',
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      let params = {
        page: 1,
        limit: 10,
      };
      this.srvUsuario.getUsuarios( params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_usuarios) => {
          if (_usuarios.body) {
            this.srvUsuario.dataUsuarios = _usuarios.body;
            Swal.close();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al cargar los usuarios',
              text: _usuarios.message,
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar los usuarios',
            text: error.error.message,
          });
        },
      });
    }, 1000);
  }










}
