import config from "config/config";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { DataMetadata } from "../../models/metadata";
import { PermisosUsuarioRolModel , Permiso , Menu} from '../../models/usuarios/permisosUsuarioRolModel';

@Injectable({
  providedIn: 'root'
})

export class PermisosUsuarioRolService {
  //rutas para hacer las peticiones al backend
  private urlApi_permisosUsuarioRol: string = config.URL_API_BASE + "permisos";
  private urlApi_buscar_permisosUsuarioRol: string = config.URL_API_BASE + "permisos/buscar";
  private urlApi_filtrar_permisosUsuarioRol: string = config.URL_API_BASE + "permisos/filtrar";

  constructor(private http: HttpClient) { }

  private destroy$ = new Subject<any>();

  private dataPermisosUsuarioRol$ = new Subject<Permiso[]>();

  permisosUsuarioRol!: Permiso[];


  setPermisosUsuarioRol(data: Permiso[]) {
    this.dataPermisosUsuarioRol$.next(data);
  }

  get getPermisosUsuarioRol() {
    return this.dataPermisosUsuarioRol$.asObservable();
  }


  //obtener permisosUsuarioRol de un usuario por ID
  obtenerPermisosUsuarioRol(_id: number) {
    return this.http.get<PermisosUsuarioRolModel>(this.urlApi_permisosUsuarioRol + "/" + _id,
      {
        withCredentials: true
      }
    );
  }

  //editar permisos

  editarPermisosUsuarioRol(idUsuarioRol: number, permisos: Permiso[]) {
    return this.http.put<PermisosUsuarioRolModel>(this.urlApi_permisosUsuarioRol + "/" + idUsuarioRol,
      {
        permisos
      },
      {
        withCredentials: true
      }
    );
  }


  //funcion para obtener todos los permisosUsuarioRol

  obtenerTodosPermisosUsuarioRol(idUsuarioRol:number) {
    this.obtenerPermisosUsuarioRol(idUsuarioRol).subscribe({
      next: (data: any) => {
        this.permisosUsuarioRol = data.body;
        this.setPermisosUsuarioRol(this.permisosUsuarioRol);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



}
