import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenusPermisosModel, MenusPermisosModelBody } from 'src/app/core/models/menus';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  isExpanded = true;
  menuAjustes : any[] = [];
  menus :MenusPermisosModelBody[] = [];
  clickSubmenus = false;
  isLoad = false;


  constructor(
    public srvMenu : MenusService,
  ) { }
  ngOnInit(): void {

    this.srvMenu.selectMenusPermisos$.subscribe((data) => {
      this.menus = data;
      this.ordenarMenus(this.menus);

    });
  }
  //ordenar menus
  ordenarMenus( menus : MenusPermisosModelBody[]){
    //formato del menú
    /*
     Inicio
     Incidencias
     Reportes
     Ajustes
    */

    //ordenar el menú
    let menuInicio = menus.filter((menu) => menu.str_menu_nombre === 'Inicio');
    let menuIncidencias = menus.filter((menu) => menu.str_menu_nombre === 'Incidencias');
    let menuReportes = menus.filter((menu) => menu.str_menu_nombre === 'Reportes');
    let menuAjustes = menus.filter((menu) => menu.str_menu_nombre === 'Ajustes');
    this.menuAjustes = menuAjustes;
    //actualizo el menú

    this.menus = [
      ...menuInicio,
      ...menuIncidencias,
      ...menuReportes,
    ];

    //si existen mas menus añaadirlos
    let otrosMenus = menus.filter((menu) => menu.str_menu_nombre !== 'Inicio' && menu.str_menu_nombre !== 'Incidencias' && menu.str_menu_nombre !== 'Reportes' && menu.str_menu_nombre !== 'Ajustes');
    this.menus = [
      ...this.menus,
      ...otrosMenus
    ];

    this.isLoad = true;

  }

  verSubMenus(menu : MenusPermisosModelBody){
    this.clickSubmenus = !this.clickSubmenus;


  }

  OnDestroy() {}




}
