import { DataMetadata } from "./metadata";

export interface MenusModel {
  status: boolean;
  message: string;
  body: MenusModelBody[];
  metadata: DataMetadata;
}

export interface MenusModelBody {
  int_menu_id:           number,
  int_menu_padre_id:     number,
  str_menu_nombre:       string,
  str_menu_descripcion:  string,
  str_menu_path:         string,
  str_menu_icono:        string,
  str_menu_estado:      string,
  dt_fecha_creacion:     string,
  dt_fecha_actualizacion: string,
}
export interface NuevoMenuModel{
    int_menu_padre_id: number;
    str_menu_descripcion: string;
    str_menu_icono: string;
    str_menu_nombre: string;
    str_menu_path: string;
}

export interface MenuEditadoModel {
  status: boolean;
  message: string;
  body: [];
}

export interface MenuEditarModel {
  str_menu_nombre:       string,
  str_menu_descripcion:  string,
  str_menu_path:         string,
  str_menu_icono:        string,
}
