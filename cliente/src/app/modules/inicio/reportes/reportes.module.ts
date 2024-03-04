import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from "./reportes.component";
import { GraficosComponent } from "./graficos/graficos.component";
import { ReporteComponent } from "./reporte/reporte.component";

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'reporte',
        loadChildren: () => import('./reportes-routing.module').then(
          (m) => m.ReportesRoutingModule)
      },
      {
        path:'graficos',
        loadChildren: () => import('./reportes-routing.module').then(
          (m) => m.ReportesRoutingModule)
      }
    ]
  },
  {
    path:'**', redirectTo:''
  }
];
@NgModule({
  declarations: [
    ReportesComponent,
    GraficosComponent,
    ReporteComponent

  ],
  imports: [
    ReportesRoutingModule,
    CommonModule,
    RouterModule.forChild(routes),


  ],
  exports: [
    RouterModule
  ],
})
export class ReportesModule {}
