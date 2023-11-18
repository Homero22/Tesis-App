import { NgModule } from "@angular/core";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { CommonModule } from "@angular/common";
import {  RouterModule } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CuentaComponent,
    MenuComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    UsuariosModule,
    ReactiveFormsModule
  ],
  exports: [
    CuentaComponent,
    MenuComponent,
    UsuariosModule,
    UsuariosComponent,

  ],
})

export class AjustesModule { }
