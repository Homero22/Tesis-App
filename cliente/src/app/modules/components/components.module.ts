import { NgModule } from "@angular/core";
import { DesplegableComponent } from "./desplegable/desplegable.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModalComponent } from "./button-modal/button-modal.component";


@NgModule({
    declarations: [
      DesplegableComponent,
      ButtonModalComponent
    ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [
      DesplegableComponent,
      ButtonModalComponent
    ],
})
export class ComponentsModule { }
