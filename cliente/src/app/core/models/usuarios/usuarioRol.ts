//usuarioROl

export interface UsuarioRolModel {
  status: boolean;
  message: string;
  body: UsuarioRolModelBody[];
}

export interface UsuarioRolModelBody {
  int_usuario_rol_id: number;
  int_usuario_id: number;
  int_rol_id: number;
  str_usuario_rol_estado: string;
  dt_fecha_creacion: string;
  dt_fecha_actualizacion: string;
  str_rol_nombre: string;
}
