import { DataMetadata } from "../metadata";

export interface ServiciosModel{
  status: boolean;
  message: string;
  body: ServiciosModelBody[];
  metadata: DataMetadata;
}

export interface ServiciosModelBody{
  int_servicio_id: number;
  str_servicio_nombre: string;
  str_servicio_estado: string;
  dt_fecha_creacion : string;
}

export interface ServicioEditadoModel{
  status: boolean;
  message: string;
  body: [];
}

export interface ServicioEditarModel{
  str_servicio_nombre: string;
}
