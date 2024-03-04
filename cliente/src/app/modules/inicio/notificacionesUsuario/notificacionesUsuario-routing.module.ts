import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { NotificacionesUsuarioComponent } from "./notificacionesUsuario.component";

const routes: Routes =[
  {
    path:'', component:NotificacionesUsuarioComponent
  }
]

@NgModule({

    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [
      RouterModule
    ],
})

export class NotificacionesUsuarioRoutingModule {}
