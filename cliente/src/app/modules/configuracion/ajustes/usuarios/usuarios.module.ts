import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    CuentaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CuentaComponent,
   
  ],
})
export class  UsuariosModule { }
