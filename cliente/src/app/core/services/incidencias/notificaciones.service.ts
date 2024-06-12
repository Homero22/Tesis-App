import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import config from "config/config";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class NotificacionesService{

  // Rutas para hacer las peticiones al backend
  private urlApi_notificaciones_usuario: string = config.URL_API_BASE + "notificacionesUsuario";


  constructor(private http: HttpClient) {}

  //obtener notificaciones de usuario por rol
  getNotificacionesUsuario(rol: string){
    return this.http.get<any>(`${this.urlApi_notificaciones_usuario}/${rol}`,
      {
        withCredentials: true
      }

    )



  }

  //eliminar notificacion de usuario
  deleteNotificacionUsuario(id: any){
    return this.http.delete<any>(`${this.urlApi_notificaciones_usuario}/${id}`);
  }

  //eliminar todas las notificaciones de usuario
  deleteAllNotificacionesUsuario(id: number){
    return this.http.delete<any>(`${this.urlApi_notificaciones_usuario}/all/${id}`);
  }




}
