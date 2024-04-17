import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EstadosService } from 'src/app/core/services/incidencias/estados.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-estado',
  templateUrl: './editar-estado.component.html',
  styleUrls: ['./editar-estado.component.css']
})
export class EditarEstadoComponent implements OnInit {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  request = false;
  loading: boolean = true;


  constructor(
    public fbEstado: FormBuilder,
    public srvModal: ModalService,
    public srvEstado: EstadosService,
  ) {
    this.myForm = this.fbEstado.group({
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
    this.srvEstado.selectUpdateEstado$
    .subscribe({
      next:(res:any)=>{
        console.log("EditarEstado?ooo?",res);
        this.myForm.controls['id'].setValue(res.int_estado_id);
        this.myForm.controls['nombre'].setValue(res.str_estado_nombre);
        this.myForm.controls['estado'].setValue(res.str_estado_estado);
        this.myForm.controls['fecha_actualizacion'].setValue(res.dt_fecha_actualizacion);
        this.myForm.controls['fecha_creacion'].setValue(res.dt_fecha_creacion);

      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  modifyEstado(){
    Swal.fire({
      title: '¿Estás seguro que desea modificar este estado?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed){

        this.srvEstado.editarEstado(this.myForm.value.id, this.myForm.value.nombre)
        .subscribe({
          next:(res:any)=>{
            if(res.status){
              Swal.fire({
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.srvEstado.obtenerEstados({
                page: 1,
                limit: 10,
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }

          },
          error:(err:any)=>{
            Swal.fire({
              title: 'Error al modificar estado',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
    }




}
