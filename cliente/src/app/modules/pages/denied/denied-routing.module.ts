import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Router } from "express";
import { DeniedComponent } from "./denied.component";

const routes: Routes = [
  {path:'', component: DeniedComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DeniedRoutingModule { }
