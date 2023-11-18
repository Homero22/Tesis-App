import { NgModule } from '@angular/core';
import { Cas } from '../../../core/models/cas';
import { CasErrComponent } from './cas-err.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CasErrRoutingModule } from './cas-err-routing.module';

@NgModule({
  declarations: [CasErrComponent],
  imports: [CommonModule,SharedModule,CasErrRoutingModule],
  exports: [CasErrComponent],
})
export class CasErrModule {}
