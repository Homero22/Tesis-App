import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import config from 'config/config';
import { Layouts } from './layout/layout';
import { CasErrModule } from './modules/pages/cas-err/cas-err.module';
import { DeniedModule } from './modules/pages/denied/denied.module';
import { FailedModule } from './modules/pages/failed/failed.module';
import { LogoutModule } from './modules/pages/logout/logout.module';
import { LoginModule } from './modules/login/login.module';
import { InicioModule } from './modules/inicio/inicio.module';
import { ConfiguracionModule } from './modules/configuracion/configuracion.module';

const routes: Routes = [
  {
    path:config.URL_BASE_PATH,
    data:{layout: Layouts.simple},
    children:[
      {path:'', loadChildren:()=>LoginModule},
      {path:'casError',loadChildren:()=>CasErrModule},
      {path:'denegado', loadChildren:()=>DeniedModule},
      {path:'404',loadChildren:()=> FailedModule},
      {path:'logout',loadChildren:()=> LogoutModule},

    ]
  },
  {
    path:config.URL_BASE_PATH,
    data:{layout:Layouts.full},
    children:[
      {path:'', loadChildren:()=>InicioModule},
      {path:'ajustes', loadChildren:()=>ConfiguracionModule}
    ]
  },
  { path: '**', redirectTo:'/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
