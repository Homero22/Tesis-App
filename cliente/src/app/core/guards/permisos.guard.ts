import { state } from "@angular/animations";
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { MenusService } from "../services/menus.service";
import { MenusPermisosModelBody } from "../models/menus";




@Injectable({
  providedIn: 'root'
})

 class PermisosGuard {
  menus :MenusPermisosModelBody[] = [];
  constructor(
    public srvMenus: MenusService
  ) {
    this.obtenerMenus();
   }
   obtenerMenus(){
    this.menus = this.srvMenus.menusPermisos;
   }

 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    const path = route.routeConfig?.path;
    const menu = this.menus.find((menu) => menu.str_menu_path === path);
    if(menu){
      console.log("Existe el menu",menu.bln_permiso_ver);
      return menu.bln_permiso_ver;
    }else{
      console.log("No existe el menu");
      return false;
    }

  }
 }
  export const isValidGuard:CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermisosGuard).canActivate(route, state);
  }


