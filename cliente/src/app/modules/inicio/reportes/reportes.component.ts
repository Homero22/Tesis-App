import { Component, OnInit } from '@angular/core';
import config from 'config/config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  isValue: number = 0;
  baseUrl = config.URL_BASE_PATH;
  path: string = '';
  typeViewMenu: boolean = true;
  id!: any;

  private destroy$ = new Subject<any>();

  listaViews: any = {
    REPORTE: 0,
    GRAFICOS: 1,
  };
  menuTabsSelected: number = 0;

  constructor() {
    this.path = window.location.pathname.split('/').pop() || '';
    this.menuTabsSelected = this.listaViews[this.path.toUpperCase()] || 0;
   }

  ngOnInit() {
  }

}
