import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EstadosService } from 'src/app/core/services/incidencias/estados.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-estado',
  templateUrl: './agregar-estado.component.html',
  styleUrls: ['./agregar-estado.component.css']
})
export class AgregarEstadoComponent implements OnInit {
  myForm!: FormGroup;
  request = false;
  private destroy$ = new Subject<any>()

  constructor(
    public fbEstado:FormBuilder,
    public srvModal: ModalService,
    public srvEstados: EstadosService,

  ) {
    this.myForm = this.fbEstado.group({
      estado_nombre: [
        "",[Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],
    })
   }

  ngOnInit() {
  }

  addEstado(){
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

    this.srvEstados.crearEstado(this.myForm.value.estado_nombre)
    .subscribe({
      next:(res:any)=>{
        if(res.status){
          Swal.fire({
            title: 'Estado creado',
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
          text: 'Error al crear el estado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        this.request = false;
      },
      complete:()=>{
        this.request = false;
        this.myForm.reset();
        this.srvEstados.obtenerEstados({page:1, limit:10});
      }
    })


  }

}
