import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificacionesUsuarioComponent } from './notificacionesUsuario/notificacionesUsuario.component';




const routes: Routes =[
  {
    path: '',
    children: [
      {
        path:'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path:'incidencias',
        loadChildren: () => import('./incidencias/incidencias.module').then(m => m.IncidenciasModule)
      },
      {
        path:'reportes',
        loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path:'notificacionesUsuario',
        loadChildren: () => import('./notificacionesUsuario/notificacionesUsuario.module').then(m => m.NotificacionesUsuarioModule)
      }



    ]
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
