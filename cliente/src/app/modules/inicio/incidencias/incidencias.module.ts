import { NgModule } from "@angular/core";
import { IncidenciasComponent } from "./incidencias.component";
import { CommonModule } from "@angular/common";
import { IncidenciasRoutingModule } from "./incidencias-routing.module";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../../components/components.module";
import { ProcesoIncidenciasModule } from "./procesoIncidencias/procesoIncidencias.module";

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'subirArchivo',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        )
      },
      {
        path:'vulnerabilidades',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        )
      },
      {
        path:'tickets',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        )
      },
      {
        path:'seguimiento',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        )
      }
    ]
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
    declarations: [
      IncidenciasComponent
    ],
    imports: [
      CommonModule,
      IncidenciasRoutingModule,
      RouterModule.forChild(routes),
      ComponentsModule,
      ProcesoIncidenciasModule
    ],
    exports: [
      RouterModule
    ],
})
export class IncidenciasModule { }
