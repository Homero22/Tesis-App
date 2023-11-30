import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  previousSearchText: string = '';
  @Input() placeholder: string = '';
  @Input() filtrando!: boolean;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() buscando: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
      this.previousSearchText = this.searchText
    }
    buscar(){
      this.search.emit(this.searchText);
    }

    //cuando el input cambia de no vacio a vacio
    onInputChange(){
      if(this.previousSearchText && !this.searchText.trim()){
        this.buscar();
      }
      this.previousSearchText = this.searchText;
    }
    ngOnChanges(){
      if(this.filtrando){
        this.searchText = '';
        this.previousSearchText = '';
      }
    }
}
