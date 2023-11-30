import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination/pagination.component";
import { FilterComponent } from "./filter/filter.component";


@NgModule({
  declarations: [
    PaginationComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PaginationComponent,
    FilterComponent,
  ]
})

export class PaginationAndFilterModule { }
