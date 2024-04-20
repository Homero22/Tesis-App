import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {

  menuTabSelected: number = 0;
  typeView: boolean = false;
  isValue: number = 3;
  condiciones: number = 0;

  listaViews: any = {
    ESTADOS: 5,
    SERVICIOS: 6,
  }

  buttonName!: number;
  private destroy$ = new Subject<any>();

  constructor(
    public srvIncidencias: IncidenciasService
  ) { }

  ngOnInit() {
    const path: string = window.location.pathname.split('/').pop() || '';
    this.menuTabSelected = this.listaViews[path.toUpperCase()] || 0;
    this.isValue = 5;
  }

  mostrarEstados(){
    this.menuTabSelected = 5;
    this.isValue = 3;
  }

  mostrarServicios(){
    this.menuTabSelected = 6;
    this.isValue = 4;
  }

}
