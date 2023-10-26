import { NgModule } from "@angular/core";
import { DeniedComponent } from "./denied.component";
import { CommonModule } from "@angular/common";
import { DeniedRoutingModule } from "./denied-routing.module";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    DeniedComponent
  ],
  imports: [
    CommonModule,
    DeniedRoutingModule,
    SharedModule
  ],
  exports: [
    DeniedComponent
  ],
})

export class DeniedModule { }
