import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  isExpanded = true;



  constructor(
    public srvMenus : MenusService,
  ) { }
  ngOnInit(): void {

  }
  OnDestroy() {}

  toggleSidebar(){
    this.isExpanded = !this.isExpanded;

  }

}
