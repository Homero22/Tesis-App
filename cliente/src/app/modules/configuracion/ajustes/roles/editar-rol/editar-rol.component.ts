import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  request = false;
  loading: boolean = true;

  constructor(
    public fbRol:FormBuilder,
    public srvModal: ModalService,
    public srvRoles: RolesService,
  ) {
    this.myForm = this.fbRol.group({
      nombre: [
        "", [Validators.required]
      ],
      descripcion: [
        "", [Validators.required]
      ],
      id: [
        "", [Validators.required]
      ],
    })
  }

  ngOnInit() {
    this.srvRoles.selectUpdateRol$
    .subscribe({
      next:(res:any)=>{
        this.myForm.controls['id'].setValue(res.int_rol_id);
        this.myForm.controls['nombre'].setValue(res.str_rol_nombre);
        this.myForm.controls['descripcion'].setValue(res.str_rol_descripcion);

      },
      error:(err:any)=>{
        console.log(err);
      }
    });

  }
  modifyRol(){

    Swal.fire({
      title: '¿Estás seguro que desea modificar este rol?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire({
          title: 'Modificando rol',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        setTimeout(() => {
        this.srvRoles.editarRol(this.myForm.value.id, this.myForm.value.nombre, this.myForm.value.descripcion)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(res:any)=>{
            if(res.status){
              Swal.fire({
                title: 'Rol modificado con éxito',
                icon: 'success',
                allowOutsideClick: false,
                timer:1000,
                didOpen: () => {
                  Swal.showLoading()
                }
              });
              this.srvModal.closeModal();
              this.srvRoles.setRoles(res.data);
            }else{
              Swal.fire({
                title: 'Error al modificar el rol',
                icon: 'error',
                text: res.message,
              });
            }
          },
          error:(err:any)=>{
            Swal.fire({
              title: 'Error al modificar el rol',
              icon: 'error',
            });
          },
          complete:()=>{
            this.srvModal.closeModal();
            this.myForm.reset();
            this.request = false;
            this.srvRoles.obtenerRoles({
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
