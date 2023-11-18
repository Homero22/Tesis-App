import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    CuentaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CuentaComponent,
  ],
})
export class  UsuariosModule { }
