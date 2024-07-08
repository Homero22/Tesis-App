import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ServiciosService } from 'src/app/core/services/incidencias/servicios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  request = false;
  loading: boolean = true;

  constructor(
    public fbServicio:FormBuilder,
    public srvServicio : ServiciosService,
    public srvModal: ModalService,
  ) {
    this.myForm = this.fbServicio.group({
      nombre: [
        "",[Validators.required]
      ],
      estado: [
        "",[Validators.required]
      ],
      id: [
        "",[Validators.required]
      ],
      fecha_actualizacion: [
        "",[Validators.required]
      ],
      fecha_creacion: [
        "",[Validators.required]
      ],
    })
   }

  ngOnInit() {
    this.srvServicio.selectUpdateServicio$
    .subscribe({
      next:(res:any)=>{

        this.myForm.controls['id'].setValue(res.int_servicio_id);
        this.myForm.controls['nombre'].setValue(res.str_servicio_nombre);
        this.myForm.controls['estado'].setValue(res.str_servicio_estado);
        this.myForm.controls['fecha_actualizacion'].setValue(res.dt_fecha_actualizacion);
        this.myForm.controls['fecha_creacion'].setValue(res.dt_fecha_creacion);

      },
      error:(err:any)=>{
        console.log(err);
      }
    });

  }
  modifyServicio(){

    Swal.fire({
      title: '¿Estás seguro que desea modificar este servicio?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvServicio.editarServicio(this.myForm.value.id, this.myForm.value.nombre)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res:any) => {
            if(res.status){
              Swal.fire({
                icon: 'success',
                title: 'Servicio modificado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              this.srvModal.closeModal();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error al modificar el servicio',
                showConfirmButton: false,
                timer: 1500
              })
            }

          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar el servicio',
              showConfirmButton: false,
              timer: 1500
            })
          },complete:()=>{
            this.request = false;
            this.srvModal.closeModal();
            this.myForm.reset();
            this.srvServicio.obtenerServicios({
              page: 1,
              limit: 10,
            });
            }
          }
        );

      }
    })


  }

}
