import { NgModule } from "@angular/core";
import { ArchivoPlanoComponent } from "./archivoPlano/archivoPlano.component";
import { SeguimientoComponent } from "./seguimiento/seguimiento.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { VulnerabilidadesComponent } from "./vulnerabilidades/vulnerabilidades.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationAndFilterModule } from "src/app/shared/paginationAndFilter/paginationAndFilter.module";




@NgModule({
    declarations: [
      ArchivoPlanoComponent,
      SeguimientoComponent,
      TicketsComponent,
      VulnerabilidadesComponent,
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
      ReactiveFormsModule,
      FormsModule,
      PaginationAndFilterModule
    ],
    exports: [
      ArchivoPlanoComponent,
      SeguimientoComponent,
      TicketsComponent,
      VulnerabilidadesComponent,
    ]
})
export class ProcesoIncidenciasModule { }
