import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./welcome.component";
import { CommonModule } from "@angular/common";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
    declarations: [
      WelcomeComponent
    ],
    imports: [
      CommonModule,
      WelcomeRoutingModule
    ],
    exports: [
      WelcomeComponent
    ],
})


export class WelcomeModule {
}
