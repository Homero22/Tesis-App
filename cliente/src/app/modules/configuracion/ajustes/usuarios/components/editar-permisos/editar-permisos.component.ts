// editar-permisos.component.ts
import { SafeCall } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermisosUsuarioRolService } from 'src/app/core/services/Usuarios/permisosUsuarioRol.service';
import { MenusService } from 'src/app/core/services/menus.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-permisos',
  templateUrl: './editar-permisos.component.html',
  styleUrls: ['./editar-permisos.component.css'],
})
export class EditarPermisosComponent implements OnInit {
  permisosSeleccionados: boolean[][] = [];

  permisos: any;

  constructor(
    public srvModal: ModalService,
    public srvPermisos: PermisosUsuarioRolService,
    public srvMenusPermisos: MenusService,
  ) {}

  ngOnInit() {
    this.srvPermisos.getPermisosUsuarioRol.subscribe({
      next: (data) => {
        this.permisos = data;

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addPermiso() {
    let int_usuario_rol_id =
      this.srvPermisos.permisosUsuarioRol[0].int_usuario_rol_id;
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se van a editar los permisos del usuario',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere',
          text: 'Guardando cambios',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        //llamo al servicio para editar los permisos
        this.srvPermisos
          .editarPermisosUsuarioRol(
            int_usuario_rol_id,
            this.srvPermisos.permisosUsuarioRol
          )
          .subscribe({
            next: (data) => {
              if (data.status) {
                Swal.fire({
                  title: 'Éxito',
                  text: 'Permisos editados correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                });
                this.srvModal.closeModal();
                this.srvMenusPermisos.obtenerMenusAndSubmenusByRol(localStorage.getItem('selectedRole')!);
              } else {
                Swal.fire({
                  title: 'Ha ocurrido un error',
                  text: data.message,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                });
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else if (result.isDenied) {
        Swal.fire('Cambios no realizados', '', 'info');
      }
    });
  }
}
