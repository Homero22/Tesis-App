import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  private destroy$ = new Subject<any>()
  isData: boolean = false;

  constructor(public servicioUsuario : UsuariosService) { }

  ngOnInit() {
    Swal.fire({
      title:'Cargando Cuenta',
      didOpen:()=>{
        Swal.showLoading(null);
      }
    })

    this.servicioUsuario.getMe()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_me)=>{
        console.log("me",_me )
        Swal.close();
        if(_me.body){
          this.isData = true;
          this.servicioUsuario.dataMiCuenta = _me.body;
        }
      },
      error:(error)=>{
        Swal.fire({
          icon:'error',
          title:'Error al cargar la cuenta',
          text: error.error.message
        })
      }
    })

  }


}
