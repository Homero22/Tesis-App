import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination/pagination.component";
import { FilterComponent } from "./filter/filter.component";
import { FormsModule } from "@angular/forms";
import { SearchComponent } from "./search/search.component";


@NgModule({
  declarations: [
    PaginationComponent,
    FilterComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PaginationComponent,
    FilterComponent,
    SearchComponent,
  ]
})

export class PaginationAndFilterModule { }
