import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { UsuariosComponent } from '../../usuarios.component';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { UsuarioModel, UsuariosModel, UsuariosModelBody} from 'src/app/core/models/usuarios/usuariosModel';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  request = false;
  loading: boolean = true;

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
    setTimeout(() => {
      this.loading = false;
    }, 400);
    this.srvUsuario.selectUpdateUsuario$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(res:UsuariosModelBody)=>{
        this.myForm.controls['id'].setValue(res.int_usuario_id);
        this.myForm.controls['nombre'].setValue(res.str_usuario_nombres);
        this.myForm.controls['apellido'].setValue(res.str_usuario_apellidos);
        this.myForm.controls['correo'].setValue(res.str_usuario_email);
        this.myForm.controls['estado'].setValue(res.str_usuario_estado);
        this.myForm.controls['telefono'].setValue(res.str_usuario_telefono);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
    this.myForm.controls['nombre'].disable();
    this.myForm.controls['apellido'].disable();
    this.myForm.controls['correo'].disable();
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
              this.srvUsuario.obtenerUsuarios({
                page:1,
                limit:10
              })
            }
          });
        }, 1000);
      }

    });
  }
}
