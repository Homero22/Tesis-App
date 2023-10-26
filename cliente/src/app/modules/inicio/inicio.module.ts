import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes =[
  {
    path: '',
    children: [
      {
        path:'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      }
    ]
  }
]
@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})

export class InicioModule {}
