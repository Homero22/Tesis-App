import { NotificacionesComponent } from './../../notificaciones/notificaciones.component';
import { NotificacionesModule } from './../../notificaciones/notificaciones.module';
import { NgModule } from "@angular/core";
import { IncidenciasComponent } from "./incidencias.component";
import { CommonModule } from "@angular/common";
import { IncidenciasRoutingModule } from "./incidencias-routing.module";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../../components/components.module";
import { ProcesoIncidenciasModule } from "./procesoIncidencias/procesoIncidencias.module";
import { GraficosComponent } from '../reportes/graficos/graficos.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { isValidGuard } from 'src/app/core/guards/permisos.guard';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'subirArchivo',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'vulnerabilidades',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'tickets',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'seguimiento',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'caracteristicas',
        loadChildren:()=>
        import('./incidencias-routing.module').then(
          (m)=>m.IncidenciasRoutingModule
        ),
        canActivate: [isValidGuard]
      }
    ]
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
    declarations: [
      IncidenciasComponent,

    ],
    imports: [
      CommonModule,
      IncidenciasRoutingModule,
      RouterModule.forChild(routes),
      ComponentsModule,
      ProcesoIncidenciasModule,
      MatDialogModule,
    ],
    exports: [
      RouterModule,

    ],
})
export class IncidenciasModule { }
