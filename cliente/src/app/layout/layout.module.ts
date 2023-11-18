import { NgModule } from '@angular/core';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { FullLayoutModule } from './full-layout/full-layout.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ]

})
export class LayoutModule{}
