import { NgModule } from '@angular/core';
import { ConfiguracionComponent } from './configuracion.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { AjustesModule } from './ajustes/ajustes.module';
import { ComponentsModule } from '../components/components.module';
import { isValidGuard } from 'src/app/core/guards/permisos.guard';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'menus',
        loadChildren:()=>
        import('./configuracion-routing.module').then(
          (m)=>m.ConfiguracionRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'cuenta',
        loadChildren:()=>
        import('./configuracion-routing.module').then(
          (m)=>m.ConfiguracionRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'usuarios',
        loadChildren:()=>
        import('./configuracion-routing.module').then(
          (m)=>m.ConfiguracionRoutingModule
        ),
        canActivate: [isValidGuard]
      },
      {
        path:'roles',
        loadChildren:()=>
        import('./configuracion-routing.module').then(
          (m)=>m.ConfiguracionRoutingModule
        ),
        canActivate: [isValidGuard]
      }

    ]
  },
]


@NgModule({
  declarations: [
    ConfiguracionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConfiguracionRoutingModule,
    AjustesModule,
    ComponentsModule
  ],
  exports: [
    RouterModule,
  ],
})

export class ConfiguracionModule { }
