import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenusService } from 'src/app/core/services/menus.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  isExpanded = true;
  menuAjustes : any[] = [];
  menus : any[] = [];


  constructor(
    public srvMenu : MenusService,
  ) { }
  ngOnInit(): void {
    let rol = localStorage.getItem('selectedRole');
    this.srvMenu.obtenerMenusAndSubmenusByRol(rol!);
  }
  OnDestroy() {}

  toggleSidebar(){
    this.isExpanded = !this.isExpanded;

  }


}
