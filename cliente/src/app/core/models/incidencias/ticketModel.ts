import { DataMetadata } from "../metadata";

export interface TicketModel {
  status: boolean;
  message: string;
  body: TicketModelBody[];
  metadata: DataMetadata;
}

export interface TicketModelBody {

    int_ticket_id: number;
    int_servicio_id: number;
    int_vulnerabilidades_id: number;
    int_estado_id: number;
    str_ticket_observacion: string;
    dt_fecha_creacion: string;
    dt_fecha_actualizacion: string;

  }
