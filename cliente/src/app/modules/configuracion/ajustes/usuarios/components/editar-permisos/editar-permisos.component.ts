import { Component, OnInit } from '@angular/core';
import { PermisosUsuarioRolService } from 'src/app/core/services/Usuarios/permisosUsuarioRol.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-editar-permisos',
  templateUrl: './editar-permisos.component.html',
  styleUrls: ['./editar-permisos.component.css']
})
export class EditarPermisosComponent implements OnInit {

  constructor(
    public srvModal : ModalService,
    public srvPermisos : PermisosUsuarioRolService

  ) { }

  ngOnInit() {
  }

  addPermiso(){}
}
