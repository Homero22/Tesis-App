import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationAndFilterModule } from 'src/app/shared/paginationAndFilter/paginationAndFilter.module';


@NgModule({
  declarations: [
    CuentaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule,
    PaginationAndFilterModule,
  ],
  exports: [
    CuentaComponent,
  ],
})
export class  UsuariosModule { }
