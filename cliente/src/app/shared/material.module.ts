import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {  MatDatepickerModule } from "@angular/material/datepicker";


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatDatepickerModule,


  ],
})
export class MaterialModule {}
