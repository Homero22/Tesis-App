import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AsideComponent } from "./aside/aside.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { BodyComponent } from "./body/body.component";

@NgModule({
    declarations: [
      FooterComponent,
      AsideComponent,
      HeaderComponent,
      MainComponent,
      BodyComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
    ],
    exports: [
      FooterComponent,
      AsideComponent,
      HeaderComponent,
      MainComponent,
      BodyComponent
    ],
})

export class SharedModule { }
