import { DataMetadata } from "./metadata";

export interface RolesModel {
  status: boolean;
  message: string;
  body: RolesModelBody[];
  metadata: DataMetadata;
}

export interface RolesModelBody {
  str_rol_descripcion:  string,
  int_rol_id:           number,
  str_rol_nombre:       string,
  str_rol_estado:      string
}

export interface RolEditadoModel {
  status: boolean;
  message: string;
  body: [];
}

export interface RolEditarModel {
  str_rol_nombre:       string,
  str_rol_descripcion:  string,
}
