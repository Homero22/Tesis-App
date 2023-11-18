import { Component, OnInit } from '@angular/core';
import config from 'config/config';
import { UsuariosService } from '../../core/services/Usuarios/usuarios.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  menuTabsSelected: number = 0;
  isValue: number = 0;
  baseUrl = config.URL_BASE_PATH;
  path: string = '';
  typeView: boolean = true;

  listaViews: any = {
    AJUSTES: 0,
    CUENTA: 0,
    MENUS: 1,
    USUARIOS: 2,
    ROLES: 3
  };
  private destroy$ = new Subject<any>();

  constructor(public usuariosService: UsuariosService ) {

    this.path = window.location.pathname.split('/').pop() || '';
    this.menuTabsSelected = this.listaViews[this.path.toUpperCase()] || 0;

  }
  open = false;
  id!: any;
  b!: boolean
  ngOnInit() {
    let c: boolean = this.b

  }

}
