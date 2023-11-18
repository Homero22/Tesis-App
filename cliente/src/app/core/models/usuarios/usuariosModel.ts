//Usuarios
export interface UsuariosModel {
  status: boolean;
  message: string;
  body: UsuariosModelBody[];
}
export interface UsuariosModelBody {
  int_usuario_id:number;
  str_usuario_nombres:string;
  str_usuario_apellidos:string;
  str_usuario_email:string;
  str_usuario_cedula:string;
  str_usuario_estado:string;
  str_usuario_telefono:string;
  editando?:boolean;
}

//Modelo cuando devuelve un usuario editado
export interface UsuarioEditadoModel {
  status: boolean;
  message: string;
  body: [];
}
