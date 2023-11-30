import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent  {
  loading: boolean = false;
  npage! : number;

  @Input() dataLength: any =[];
  @Input() metadata: any = [];
  @Input() currentPage: any = 0;

  //Eventos
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  changePageDir(dir: number) {
    this.currentPage = this.currentPage + 1 *(dir == 1 ? 1 : -1)
    this.changePage.emit(this.currentPage);
  }

}
