import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  RouterModule } from "@angular/router";

import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from "./usuarios/components/editar-usuario/editar-usuario.component";
import { PaginationAndFilterModule } from "src/app/shared/paginationAndFilter/paginationAndFilter.module";
import { MenusComponent } from "./menus/menus.component";
import { RolesComponent } from "./roles/roles.component";
import { AgregarUsuarioComponent } from "./usuarios/components/agregar-usuario/agregar-usuario.component";
import { EditarRolComponent } from "./roles/editar-rol/editar-rol.component";
import { AgregarRolComponent } from "./roles/agregar-rol/agregar-rol.component";
import { AgregarMenuComponent } from "./menus/agregar-menu/agregar-menu.component";
import { EditarMenuComponent } from "./menus/editar-menu/editar-menu.component";
import { SubmenusComponent } from "./menus/submenus/submenus.component";
import { AgregarPerfilesComponent } from "./usuarios/components/perfiles/agregar-perfiles/agregar-perfiles.component";
import { EditarPermisosComponent } from "./usuarios/components/editar-permisos/editar-permisos.component";



@NgModule({
  declarations: [
    MenusComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    AgregarUsuarioComponent,
    RolesComponent,
    EditarRolComponent,
    AgregarRolComponent,
    AgregarMenuComponent,
    EditarMenuComponent,
    SubmenusComponent,
    AgregarPerfilesComponent,
    EditarPermisosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    UsuariosModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationAndFilterModule
  ],
  exports: [
    MenusComponent,
    UsuariosModule,
    UsuariosComponent,
    EditarUsuarioComponent,
    AgregarUsuarioComponent,
    RolesComponent,
    EditarRolComponent,
    AgregarRolComponent,
    AgregarMenuComponent,
    EditarMenuComponent,
    SubmenusComponent,
    AgregarPerfilesComponent,
    EditarPermisosComponent,

  ],
})

export class AjustesModule { }
