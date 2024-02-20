import { Component, OnInit } from '@angular/core';
import { IncidenciasModelBody } from 'src/app/core/models/incidencias/incidenciasModel';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';

@Component({
  selector: 'app-infoIncidencia',
  templateUrl: './infoIncidencia.component.html',
  styleUrls: ['./infoIncidencia.component.css']
})
export class InfoIncidenciaComponent implements OnInit {

  constructor(public srvIncidencia: IncidenciasService) { }

  verIncidencia!: IncidenciasModelBody;

  ngOnInit() {
    this.verIncidencia = this.srvIncidencia.verIncidencia;

  }

}
