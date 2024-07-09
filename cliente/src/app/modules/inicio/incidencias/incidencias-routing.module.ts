import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncidenciasComponent } from "./incidencias.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";


const routes:Routes = [
    {path:'', component:IncidenciasComponent}

]
@NgModule({

    imports: [
      RouterModule.forChild(routes),

    ],
    exports: [
      RouterModule
    ],
})

export class IncidenciasRoutingModule { }
