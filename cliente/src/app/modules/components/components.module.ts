import { NgModule } from "@angular/core";
import { DesplegableComponent } from "./desplegable/desplegable.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModalComponent } from "./button-modal/button-modal.component";
import { MaterialModule } from "src/app/shared/material.module";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
      DesplegableComponent,
      ButtonModalComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
    ],
    exports: [
      DesplegableComponent,
      ButtonModalComponent,
    ],
})
export class ComponentsModule { }
