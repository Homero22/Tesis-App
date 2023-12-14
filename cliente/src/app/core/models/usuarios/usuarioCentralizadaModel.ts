export interface UsuarioCentralizadaModel {
  status: boolean;
  body: DataCentralizada;
  message: string;  
}
export interface DataCentralizada {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
}


