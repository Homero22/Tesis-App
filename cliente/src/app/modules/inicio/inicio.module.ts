import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';





const routes: Routes =[
  {
    path: '',
    children: [
      {
        path:'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
        canActivate: []
      },
      {
        path:'incidencias',
        loadChildren: () => import('./incidencias/incidencias.module').then(m => m.IncidenciasModule),
        canActivate: []
      },
      {
        path:'reportes',
        loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule),
        canActivate: []
      },
      {
        path:'notificacionesUsuario',
        loadChildren: () => import('./notificacionesUsuario/notificacionesUsuario.module').then(m => m.NotificacionesUsuarioModule)
      }
    ],

  },

]
@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,






  ],
  exports: [
    RouterModule
  ]
})

export class InicioModule {}
