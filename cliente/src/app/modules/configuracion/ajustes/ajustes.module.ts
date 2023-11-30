import { NgModule } from "@angular/core";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { CommonModule } from "@angular/common";
import {  RouterModule } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from "./usuarios/components/editar-usuario/editar-usuario.component";
import { PaginationAndFilterModule } from "src/app/shared/paginationAndFilter/paginationAndFilter.module";


@NgModule({
  declarations: [
    CuentaComponent,
    MenuComponent,
    UsuariosComponent,
    EditarUsuarioComponent
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
    CuentaComponent,
    MenuComponent,
    UsuariosModule,
    UsuariosComponent,
    EditarUsuarioComponent
  ],
})

export class AjustesModule { }
