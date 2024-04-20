import { DataMetadata } from "../metadata";

export interface EstadosModel{
  status: boolean;
  message: string;
  body: EstadosModelBody[];
  metadata: DataMetadata;
}

export interface EstadosModelBody{
  int_estado_id: number;
  str_estado_nombre: string;
  str_estado_estado: string;
  dt_fecha_creacion : string;
}

export interface EstadioEditadoModel{
  status: boolean;
  message: string;
  body: [];
}

export interface EstadoEditarModel{
  str_servicio_nombre: string;
}
