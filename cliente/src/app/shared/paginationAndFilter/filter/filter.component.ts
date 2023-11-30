import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
searchText: string = '';
previousSearchText: string = '';
@Input() placeholder: string = '';
@Output() search: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.previousSearchText = this.searchText;
  }
  filter(){
    this.search.emit(this.searchText);
  }

  //cuando el input cambia de no vacio a vacio
  onInputChange(){
    if(this.previousSearchText && !this.searchText.trim()){
      this.filter();
    }
    this.previousSearchText = this.searchText;
  }
}
