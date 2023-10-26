import { NgModule } from '@angular/core';
import { CasErrComponent } from './cas-err.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CasErrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasErrRoutingModule {}
