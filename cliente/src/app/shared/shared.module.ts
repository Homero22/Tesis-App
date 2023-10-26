import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AsideComponent } from "./aside/aside.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      FooterComponent,
      AsideComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
    ],
    exports: [
      FooterComponent,
      AsideComponent
    ],
})

export class SharedModule { }
