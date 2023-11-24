

import config from "config/config";

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MiCuentaModel, MiCuentaModelBody } from "../../models/usuarios/miCuentaModel";
import { UsuarioEditadoModel, UsuarioModel, UsuariosModel, UsuariosModelBody } from "../../models/usuarios/usuariosModel";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService{
    //Rutas para hacer las peticiones al backend
    private urlApi_me: string = config.URL_API_BASE + "usuarios/miCuenta";
    private urlApi_usuarios: string = config.URL_API_BASE + "usuarios";
    private urlApi_desactivar_usuario: string = config.URL_API_BASE + "usuarios/desactivar";

    constructor(private http: HttpClient){}
    getMe(){
      return this.http.get<MiCuentaModel>(this.urlApi_me ,
        {
          withCredentials: true
        }
      );


    }

    dataMiCuenta : MiCuentaModelBody = {
      int_usuario_id:0,
      str_usuario_nombres:'',
      str_usuario_apellidos:'',
      str_usuario_email:'',
      str_usuario_cedula:'',
      str_usuario_estado:'',
      str_usuario_telefono:''
    }

    dataUsuarios! : UsuariosModelBody [];



    //Obtener usuarios
    getUsuarios(){
      return this.http.get<UsuariosModel>(this.urlApi_usuarios,
        {
          withCredentials: true
        }
      );
    }

    //Editar usuario
    editarUsuario(_id:number,_telefono:string){
      console.log("id",_id);
      console.log("telefono",_telefono);
      return this.http.put<UsuarioEditadoModel>(`${this.urlApi_usuarios}/${_id}`,
        {
          telefono:_telefono
        },
        {
          withCredentials: true
        }
        )
    }

    //Obtener usuario por id
    getUsuario(_id:number){
      return this.http.get<UsuarioModel>(`${this.urlApi_usuarios}/${_id}`,
        {
          withCredentials: true
        }
      );
    }

    //Cambiar estado de usuario
    cambiarEstadoUsuario(_id:number){
      return this.http.put<UsuarioEditadoModel>(`${this.urlApi_desactivar_usuario}/${_id}`,
        {
          withCredentials: true
        }
        )
    }


}
