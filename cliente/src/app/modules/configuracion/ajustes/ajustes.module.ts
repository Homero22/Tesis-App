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


@NgModule({
  declarations: [
    MenusComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    AgregarUsuarioComponent,
    RolesComponent
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
    RolesComponent
  ],
})

export class AjustesModule { }
