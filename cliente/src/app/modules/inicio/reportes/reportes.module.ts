import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from "./reportes.component";
import { GraficosComponent } from "./graficos/graficos.component";
import { ReporteComponent } from "./reporte/reporte.component";
import { PaginationAndFilterModule } from '../../../shared/paginationAndFilter/paginationAndFilter.module';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";
import {MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';

import {FormControl, FormGroup,  ReactiveFormsModule} from '@angular/forms';
import { NgChartsModule } from "ng2-charts";



// import { PdfComponent } from './pdf/pdf.component';



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
    ReporteComponent,
   // PdfComponent,



  ],
  imports: [
    ReportesRoutingModule,
    CommonModule,
    RouterModule.forChild(routes),
    PaginationAndFilterModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    NgChartsModule,










  ],
  exports: [
    RouterModule,
    GraficosComponent
  ],
})
export class ReportesModule {}
