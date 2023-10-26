import { NgModule } from '@angular/core';
import { Cas } from '../../../core/models/cas';
import { CasErrComponent } from './cas-err.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CasErrComponent],
  imports: [CommonModule,SharedModule],
  exports: [CasErrComponent],
})
export class CasErrModule {}
