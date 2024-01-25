import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioRolModelBody } from 'src/app/core/models/usuarios/usuarioRol';
import { CasClient } from 'src/app/core/security/CasClient/CasClient';
import { PermisosUsuarioRolService } from 'src/app/core/services/Usuarios/permisosUsuarioRol.service';
import { UsuarioRolService } from 'src/app/core/services/Usuarios/usuarioRol.service';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { MenusService } from 'src/app/core/services/menus.service';

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

  rolesUsuario: any[] = [];
  selectedRole: any;

  constructor(    public srvUsuario: UsuariosService,
    public srvUsuarioRol: UsuarioRolService,
    public srvMenus: MenusService,
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

    this.srvUsuarioRol
      .getUsuarioLogueadoRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            this.rolesUsuario = data.body;
            this.selectedRole = this.rolesUsuario[0];
            const storedRole = localStorage.getItem('selectedRole');
            if(storedRole){
              this.nameRol = storedRole;
            }else{
              this.nameRol = this.rolesUsuario[0].str_rol_nombre;
            }


          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });




  }

  permisos(rol: UsuarioRolModelBody){
    this.nameRol = rol.str_rol_nombre;

    localStorage.setItem('selectedRole',this.nameRol);

    this.srvMenus.obtenerMenusAndSubmenusByRol(this.nameRol);

    //refrescar la pagina y dirigir a la pagina de inicio /welcome
    window.location.reload();
    // Redirigir a la página de inicio
  window.location.assign('/welcome');





  }

  ajustes(){
    window.location.assign('/ajustes');
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
