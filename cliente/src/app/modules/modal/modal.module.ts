import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { CommonModule } from "@angular/common";
import { AjustesModule } from "../configuracion/ajustes/ajustes.module";
import { UsuariosModule } from "../configuracion/ajustes/usuarios/usuarios.module";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
      ModalComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
      AjustesModule,

    ],
    exports: [
      ModalComponent
    ],
})

export class ModalModule { }
