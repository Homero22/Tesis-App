import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./welcome.component";
import { CommonModule } from "@angular/common";
import { WelcomeRoutingModule } from "./welcome-routing.module";
import { ReportesModule } from "../reportes/reportes.module";

@NgModule({
    declarations: [
      WelcomeComponent,
    ],
    imports: [
      CommonModule,
      WelcomeRoutingModule,
      ReportesModule
    ],
    exports: [
      WelcomeComponent,
    ],
})


export class WelcomeModule {
}
