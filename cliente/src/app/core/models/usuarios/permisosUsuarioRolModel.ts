
export interface Menu {
  int_menu_id: number;
  str_menu_nombre: string;
  str_menu_descripcion: string;
  str_menu_icono: string;
  str_menu_path: string;
  int_menu_padre_id: number | null;
  str_menu_estado: string;
}

export interface Permiso {
  int_permiso_id: number;
  str_permiso_estado: string;
  bln_permiso_ver: boolean;
  bln_permiso_crear: boolean;
  bln_permiso_editar: boolean;
  bln_permiso_eliminar: boolean;
  int_menu_id: number;
  int_usuario_rol_id: number;
  dt_fecha_creacion: string; // Puedes ajustar el tipo de fecha según tus necesidades
  dt_fecha_actualizacion: string; // Puedes ajustar el tipo de fecha según tus necesidades
  tb_menu: Menu;
}

export interface PermisosUsuarioRolModel {
  status: boolean;
  message: string;
  body: Permiso[];
}

