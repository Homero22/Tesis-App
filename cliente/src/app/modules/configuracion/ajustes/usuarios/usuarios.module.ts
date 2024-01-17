import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationAndFilterModule } from 'src/app/shared/paginationAndFilter/paginationAndFilter.module';
import { PerfilesComponent } from './components/perfiles/perfiles.component';


@NgModule({
  declarations: [
    CuentaComponent,
    PerfilesComponent,

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
    PerfilesComponent,

  ],
})
export class  UsuariosModule { }
