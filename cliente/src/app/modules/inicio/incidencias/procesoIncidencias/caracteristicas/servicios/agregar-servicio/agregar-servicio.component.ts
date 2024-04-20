import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ServiciosService } from 'src/app/core/services/incidencias/servicios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {
  myForm!: FormGroup;
  request = false;
  private destroy$ = new Subject<any>()
  constructor(
    public fbServicio:FormBuilder,
    public srvModal: ModalService,
    public srvServicios: ServiciosService,
  ) {
    this.myForm = this.fbServicio.group({
      servicio_nombre: [
        "",[Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],
    })
   }

  ngOnInit() {

  }
  addServicio(){
    Swal.fire({
      title: 'Cargando...',
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.request = true;
    if(this.myForm.invalid){
      this.request = false;
      return;
    }

    this.srvServicios.crearServicio(this.myForm.value.servicio_nombre)
    .subscribe({
      next:(res:any)=>{
        if(res.status){
          Swal.fire({
            title: 'Servicio creado',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
        else{
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
        this.request = false;
      },
      error:(err:any)=>{
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el servicio',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        this.request = false;
      },
      complete:()=>{
        this.request = false;
        this.myForm.reset();
        this.srvServicios.obtenerServicios({
          page:1,
          limit:10
        })
      }
    })





  }

}
