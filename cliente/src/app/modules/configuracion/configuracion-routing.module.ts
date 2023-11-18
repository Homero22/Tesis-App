import {  RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { ConfiguracionComponent } from "./configuracion.component";


const routes: Routes = [
  {
    path: '', component:ConfiguracionComponent,
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule { }
