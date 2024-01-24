import { NgModule } from "@angular/core";
import { IncidenciasComponent } from "./incidencias.component";
import { CommonModule } from "@angular/common";
import { IncidenciasRoutingModule } from "./incidencias-routing.module";



@NgModule({
    declarations: [
      IncidenciasComponent
    ],
    imports: [
      CommonModule,
      IncidenciasRoutingModule

    ],
    exports: [
      IncidenciasComponent
    ],
})
export class IncidenciasModule { }
