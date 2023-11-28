import { NgModule } from "@angular/core";
import { DesplegableComponent } from "./desplegable/desplegable.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [
      DesplegableComponent
    ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [
      DesplegableComponent
    ],
})
export class ComponentsModule { }
