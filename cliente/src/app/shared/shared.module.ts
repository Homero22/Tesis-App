import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AsideComponent } from "./aside/aside.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { BodyComponent } from "./body/body.component";
import { ConfiguracionModule } from "../modules/configuracion/configuracion.module";
import { ComponentsModule } from "../modules/components/components.module";

@NgModule({
    declarations: [
      FooterComponent,
      AsideComponent,
      HeaderComponent,
      MainComponent,
      BodyComponent,

    ],
    imports: [
      CommonModule,
      RouterModule.forChild([]),
      ComponentsModule
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
