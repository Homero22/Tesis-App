import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

@Input() filtros: any[] = [];
@Input() buscando!: boolean ;
@Output() filtroSeleccionado: EventEmitter<any> = new EventEmitter();
filtroSeleccionadoValor: string = 'Ver todo'; // Valor inicial del filtro
  constructor() { }



  ngOnInit() {
  }
  seleccionarFiltro() {
    this.filtroSeleccionado.emit(this.filtroSeleccionadoValor);
  }

  ngOnChanges() {


      this.filtroSeleccionadoValor = 'Ver todo';


  }



}
