import { Component, Input, OnInit } from '@angular/core';
import config from 'config/config';
import { UsuariosService } from '../../core/services/Usuarios/usuarios.service';
import { Subject, takeUntil } from 'rxjs';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  menuTabsSelected: number = 0;
  isValue: number = 0;
  baseUrl = config.URL_BASE_PATH;
  path: string = '';
  typeView: boolean = true;

  verPerfil: boolean = false;



  listaViews: any = {
    AJUSTES: 0,
    CUENTA: 0,
    MENUS: 1,
    USUARIOS: 2,
    ROLES: 3
  };
  private destroy$ = new Subject<any>();

  constructor(public usuariosService: UsuariosService,
    public srvMenus: MenusService
     ) {

    this.path = window.location.pathname.split('/').pop() || '';
    this.menuTabsSelected = this.listaViews[this.path.toUpperCase()] || 0;

  }
  open = false;
  id!: any;
  b!: boolean
  ngOnInit() {
    let c: boolean = this.b
    this.usuariosService.selectVerPerfil$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.open = res;
    });




  }



   permiso(path: string, accion:string){


      let menus = this.srvMenus.menusPermisos;
      // Función recursiva para buscar en todos los menús y submenús
    function buscarPermiso(menu: any): boolean | null {
      if (menu.str_menu_path === path && menu[accion] !== undefined) {
        return menu[accion];
      }
      if (menu.submenus && menu.submenus.length > 0) {
        for (const submenu of menu.submenus) {
          const permisoEnSubmenu = buscarPermiso(submenu);
          if (permisoEnSubmenu !== null) {
            return permisoEnSubmenu;
          }
        }
      }
      return null;
    }

    // Iterar sobre todos los menús
    for (const menu of menus) {
      const permisoEnMenu = buscarPermiso(menu);
      if (permisoEnMenu !== null) {
        return permisoEnMenu;
      }
    }

    // Si no se encuentra el permiso, devolver null
    return null;



  }

}
