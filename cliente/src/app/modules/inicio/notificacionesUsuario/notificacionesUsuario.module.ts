import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesUsuarioComponent } from './notificacionesUsuario.component';
import { RouterModule, Routes } from '@angular/router';
import { NotificacionesUsuarioRoutingModule } from './notificacionesUsuario-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  imports: [
    CommonModule,
    NotificacionesUsuarioRoutingModule,
    MaterialModule
  ],
  declarations: [NotificacionesUsuarioComponent],
  exports: [NotificacionesUsuarioComponent]
})
export class NotificacionesUsuarioModule { }
