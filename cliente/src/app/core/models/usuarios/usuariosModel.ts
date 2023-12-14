import { DataMetadata } from "../metadata";

//Usuarios
export interface UsuariosModel {
  status: boolean;
  message: string;
  body: UsuariosModelBody[];
  metadata: DataMetadata;
}
export interface UsuariosModelBody {
  int_usuario_id:number;
  str_usuario_nombres:string;
  str_usuario_apellidos:string;
  str_usuario_email:string;
  str_usuario_cedula:string;
  str_usuario_estado:string;
  str_usuario_telefono:string;
}

//Modelo cuando devuelve un usuario editado
export interface UsuarioEditadoModel {
  status: boolean;
  message: string;
  body: [];
}

//Modelo cuando devuelve un solo usuario
export interface UsuarioModel {
  status: boolean;
  message: string;
  body: UsuariosModelBody;
}

