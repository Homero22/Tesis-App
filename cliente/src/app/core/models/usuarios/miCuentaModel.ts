//Mi cuenta

export interface MiCuentaModel {
  status: boolean;
  message: string;
  body: MiCuentaModelBody;
}
export interface MiCuentaModelBody {
  int_usuario_id:number;
  str_usuario_nombres:string;
  str_usuario_apellidos:string;
  str_usuario_email:string;
  str_usuario_cedula:string;
  str_usuario_estado:string;
  str_usuario_telefono:string;
}





