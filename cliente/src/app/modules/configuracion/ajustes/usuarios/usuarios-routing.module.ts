import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuariosComponent } from "./usuarios.component";


const routes: Routes = [
  {
    path: '', component: UsuariosComponent,
  }
];
@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})

export class UsuariosRoutingModule { }
