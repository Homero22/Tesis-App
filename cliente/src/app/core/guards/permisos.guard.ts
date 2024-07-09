import { state } from "@angular/animations";
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { MenusService } from "../services/menus.service";
import { MenusPermisosModelBody } from "../models/menus";




@Injectable({
  providedIn: 'root'
})

 class PermisosGuard {
  menus :MenusPermisosModelBody[] = [];
  constructor(
    public srvMenus: MenusService,
    private router: Router
  ) {
    this.obtenerMenus();
   }
   // Función recursiva para buscar permisos en menús y submenús
  buscarPermiso(menus: MenusPermisosModelBody[], path: string): MenusPermisosModelBody | undefined {
    if (!Array.isArray(menus)) {
      return undefined;
    }
    for (const menu of menus) {
      if (path.includes(menu.str_menu_path)) {
        return menu;
      }
      if (menu.submenus && menu.submenus.length > 0) {
        const submenu = this.buscarPermiso(menu.submenus, path);
        if (submenu) {
          return submenu;
        }
      }
    }
    return undefined;
  }
   obtenerMenus(){
    this.menus = this.srvMenus.menusPermisos;
    console.log("Menus en Guard", this.menus);
   }

 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    const path = state.url; // Usar el URL completo
    console.log("Path de Route: ", path);
    const menu = this.buscarPermiso(this.menus, path);
    if (menu) {
      console.log("Existe el menu", menu.bln_permiso_ver);
      return menu.bln_permiso_ver;
    } else {
      console.log("No existe el menu");
      this.router.navigate(['/denegado']);
      return false;
    }

  }
 }
  export const isValidGuard:CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermisosGuard).canActivate(route, state);
  }


