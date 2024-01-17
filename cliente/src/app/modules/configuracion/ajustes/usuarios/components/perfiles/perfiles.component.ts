import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';
import { UsuarioRolService } from '../../../../../../core/services/Usuarios/usuarioRol.service';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { PermisosUsuarioRolService } from 'src/app/core/services/Usuarios/permisosUsuarioRol.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  usuario! : UsuariosModelBody;
  rolesUsuario!: any[];

  constructor(
    public UsuariosService: UsuariosService,
    public UsuarioRolService: UsuarioRolService,
    public srvModal : ModalService,
    public srvRoles : RolesService,
    public srvPermisos : PermisosUsuarioRolService

  ) { }

  ngOnInit() {


  }

  returnView(status: boolean) {
    this.UsuariosService.setVerPerfil(false);
  }
  addRol(_tittle:string, _form:string){
    this.srvModal.setFormModal({formulario:_form, title:_tittle, special:false});
    this.srvModal.openModal();
    this.srvRoles.obtenerTodosRoles();


  }

  editarPermisos(id:number, _tittle:string, _form:string){
    this.srvModal.setFormModal({formulario:_form, title:_tittle, special:false});
    this.srvModal.openModal();
    this.srvPermisos.obtenerTodosPermisosUsuarioRol(id);

  }

  cambiarEstado(id:number){

  }




}
