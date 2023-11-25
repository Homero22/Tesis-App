import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CasClient } from 'src/app/core/security/CasClient/CasClient';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {
  private destroy$ = new Subject<any>();
  id_Per: number = 0;
  roles: string[] = [];
  nameRol: string = '';
  getBolean?: boolean;
  srvModal: any;
  showDropdown = false;
  showDropdownRoles = false;
  showDropdownResponsive = false;

  constructor(    public srvUsuario: UsuariosService,
    public casCliente: CasClient) { }

  ngOnInit():void {
    this.srvUsuario
    .getMe()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (_me) => {
        this.srvUsuario.dataMiCuenta = _me.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  salirDelSistema() {
    this.casCliente.Logout();
  }
  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdownRoles() {
    this.showDropdownRoles = !this.showDropdownRoles;
  }

}
