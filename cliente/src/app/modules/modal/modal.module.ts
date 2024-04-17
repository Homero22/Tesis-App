import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { CommonModule } from "@angular/common";
import { AjustesModule } from "../configuracion/ajustes/ajustes.module";
import { UsuariosModule } from "../configuracion/ajustes/usuarios/usuarios.module";
import { RouterModule } from "@angular/router";
import { ProcesoIncidenciasModule } from "../inicio/incidencias/procesoIncidencias/procesoIncidencias.module";


@NgModule({
    declarations: [
      ModalComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
      AjustesModule,
      ProcesoIncidenciasModule,


    ],
    exports: [
      ModalComponent
    ],
})

export class ModalModule { }
