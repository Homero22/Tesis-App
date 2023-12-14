import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {
  myForm!: FormGroup;
  request = false;
  private destroy$ = new Subject<any>()


  constructor(
    public fbRol:FormBuilder,
    public srvRoles: RolesService,
    public srvModal: ModalService,
  ) {

    this.myForm = this.fbRol.group({
      rol_nombre: [
        "",[Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],
      rol_descripcion: [
        "",[Validators.required]
      ]
    })
  }

  ngOnInit() {
  }

  addRol(){
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
    this.srvRoles.crearRol(this.myForm.value.rol_nombre, this.myForm.value.rol_descripcion)
    .subscribe({
      next:(res:any)=>{
        if(res.status){
          Swal.fire({
            title: 'Rol creado',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error:(err:any)=>{
        console.log(err);
        this.request = false;
      },
      complete:()=>{
        this.request = false;
        this.myForm.reset();
        this.srvModal.closeModal();
        this.srvRoles.obtenerRoles({
          page:1,
          limit:10,
        })
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
