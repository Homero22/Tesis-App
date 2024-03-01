import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




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
