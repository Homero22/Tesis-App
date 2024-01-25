import { Component, OnDestroy, OnInit } from '@angular/core';
import config from 'config/config';
import { Subject } from 'rxjs';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit, OnDestroy {

  isValue: number = 0;
  baseUrl = config.URL_BASE_PATH;
  path:string = '';
  typeViewMenu: boolean = true;
  id!: any;

  private destroy$ = new Subject<any>();

  listaViews: any = {
    ARCHIVO: 0,
    VULNERABILIDADES: 1,
    TICKETS: 2,
    SEGUIMIENTO: 3,
  };

  constructor(
    public srvMenus: MenusService,
  ) {
    this.path = window.location.pathname.split('/').pop() || '';
    this.menuTabsSelected = this.listaViews[this.path.toUpperCase()] || 0;
   }

  menuTabsSelected: number = 0;
  menuTabIncidencias: number = 0;
  elementForm: {
    form: string,
    title: string,
    special: true
  } = {
      form: '',
      title: '',
      special: true
    }

  dataValue: any = {
    typeView: true,
    valorView: 0
  }
  open = false;

  b!: boolean

  special!: boolean
  special_agg!: boolean


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



  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
