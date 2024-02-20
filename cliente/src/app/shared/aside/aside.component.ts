import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenusPermisosModelBody } from 'src/app/core/models/menus';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  isExpanded = true;
  menuAjustes : any[] = [];
  menus :MenusPermisosModelBody[] = [];


  constructor(
    public srvMenu : MenusService,
  ) { }
  ngOnInit(): void {
    this.srvMenu.selectMenusPermisos$.subscribe((data) => {
      this.menus = data;
    });
  }
  OnDestroy() {}

  toggleSidebar(){
    this.isExpanded = !this.isExpanded;

  }


}
