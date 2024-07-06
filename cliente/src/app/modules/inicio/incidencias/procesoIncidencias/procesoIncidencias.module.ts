import { NgModule } from "@angular/core";
import { ArchivoPlanoComponent } from "./archivoPlano/archivoPlano.component";
import { SeguimientoComponent } from "./seguimiento/seguimiento.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { VulnerabilidadesComponent } from "./vulnerabilidades/vulnerabilidades.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationAndFilterModule } from "src/app/shared/paginationAndFilter/paginationAndFilter.module";
import { InfoIncidenciaComponent } from "./vulnerabilidades/components/infoIncidencia/infoIncidencia.component";
import { CrearTicketComponent } from "./tickets/components/crearTicket/crearTicket.component";
import { CaracteristicasComponent } from "./caracteristicas/caracteristicas.component";
import { EstadosComponent } from "./caracteristicas/estados/estados.component";
import { ServiciosComponent } from "./caracteristicas/servicios/servicios.component";
import { AgregarEstadoComponent } from "./caracteristicas/estados/agregar-estado/agregar-estado.component";
import { AgregarServicioComponent } from "./caracteristicas/servicios/agregar-servicio/agregar-servicio.component";
import { EditarServicioComponent } from "./caracteristicas/servicios/editar-servicio/editar-servicio.component";
import { EditarEstadoComponent } from "./caracteristicas/estados/editar-estado/editar-estado.component";
import { VerTicketComponent } from "./tickets/components/ver-ticket/ver-ticket.component";
import { EditarTicketComponent } from "./tickets/components/editar-ticket/editar-ticket.component";
import { AddSolucionTicketComponent } from "./tickets/components/add-solucion-ticket/add-solucion-ticket.component";
import { PasarTicketComponent } from "./tickets/components/pasar-ticket/pasar-ticket.component";
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogActions, MatDialogModule } from "@angular/material/dialog";




@NgModule({
    declarations: [
      ArchivoPlanoComponent,
      SeguimientoComponent,
      TicketsComponent,
      VulnerabilidadesComponent,
      InfoIncidenciaComponent,
      CrearTicketComponent,
      CaracteristicasComponent,
      EstadosComponent,
      ServiciosComponent,
      AgregarEstadoComponent,
      AgregarServicioComponent,
      EditarServicioComponent,
      EditarEstadoComponent,
      VerTicketComponent,
      EditarTicketComponent,
      AddSolucionTicketComponent,
      PasarTicketComponent,
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
      ReactiveFormsModule,
      FormsModule,
      PaginationAndFilterModule,
      MatTabsModule
    ],
    exports: [
      ArchivoPlanoComponent,
      SeguimientoComponent,
      TicketsComponent,
      VulnerabilidadesComponent,
      InfoIncidenciaComponent,
      CrearTicketComponent,
      CaracteristicasComponent,
      EstadosComponent,
      ServiciosComponent,
      AgregarEstadoComponent,
      AgregarServicioComponent,
      EditarServicioComponent,
      EditarEstadoComponent,
      VerTicketComponent,
      EditarTicketComponent,
      AddSolucionTicketComponent,
      PasarTicketComponent,


    ]
})
export class ProcesoIncidenciasModule { }
