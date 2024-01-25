import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncidenciasComponent } from "./incidencias.component";


const routes:Routes = [
    {path:'', component:IncidenciasComponent}

]
@NgModule({

    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ],
})

export class IncidenciasRoutingModule { }
