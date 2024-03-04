import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificacionesComponent } from "./notificaciones.component";


@NgModule({
  declarations: [
    NotificacionesComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [
    NotificacionesComponent
  ],
})
export class NotificacionesModule {}
