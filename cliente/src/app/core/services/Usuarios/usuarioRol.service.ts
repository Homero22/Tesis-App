import config from "config/config";

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataMetadata } from "../../models/metadata";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import Swal from "sweetalert2";
import { UsuarioRolModel, UsuarioRolModelBody } from "../../models/usuarios/usuarioRol";

@Injectable({
    providedIn: 'root'
})

export class UsuarioRolService {

  //rutas para hacer las peticiones al backend
  private urlApi_usuarioRol: string = config.URL_API_BASE + "usuarioRol";
  private urlApi_buscar_usuarioRol: string = config.URL_API_BASE + "usuarioRol/buscar";
  private urlApi_filtrar_usuarioRol: string = config.URL_API_BASE + "usuarioRol/filtrar";
  private urlApi_logueado_usuarioRol: string = config.URL_API_BASE + "usuarioRol/usuarioLogueado";


  constructor(private http: HttpClient) { }

  private destroy$ = new Subject<any>();
  private dataUsuariosRoles$ = new BehaviorSubject<UsuarioRolModelBody[
  ]>(
    [] as UsuarioRolModelBody[]
  );



  usuariosRoles!: UsuarioRolModelBody[];

  setUsuariosRoles(data: UsuarioRolModelBody[]) {
    this.dataUsuariosRoles$.next(data);
  }

  get getUsuariosRoles$() {
    return this.dataUsuariosRoles$.asObservable();

  }


  //obtener usuarioRoles de un usuario por ID
  getUsuarioRoles(_id: number) {
    return this.http.get<UsuarioRolModel>(this.urlApi_usuarioRol + "/" + _id,
      {
        withCredentials: true
      }
    );
  }

  getUsuarioLogueadoRoles() {
    return this.http.get<UsuarioRolModel>(this.urlApi_logueado_usuarioRol,
      {
        withCredentials: true
      }
    );
  }

  //crear usuarioRol enviando el idRol y el idUsuario

  crearUsuarioRol(idRol: number, idUsuario: number) {

    return this.http.post<UsuarioRolModel>(this.urlApi_usuarioRol,
      {
        idRol,
        idUsuario,
      },
      {
        withCredentials: true
      }
    );
  }

  //cambiar estado de un usuarioRol
  cambiarEstadoUsuarioRol(id: number) {
    return this.http.put<UsuarioRolModel>(this.urlApi_usuarioRol + "/" + id,
      {
        withCredentials: true
      }
    );
  }


  //funcion para obtener los roles de un usuario

  obtenerUsuarioRoles(_id: number) {
    this.getUsuarioRoles(_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(data:UsuarioRolModel)=>{
        if(data.status){
          this.usuariosRoles = data.body;
          this.setUsuariosRoles(this.usuariosRoles);
        }
      },
      error:(err:any)=>{
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: err.error.message,
          icon: 'error',
        })
      }
    })
  }

  //funcion general para cambiar el estado de un usuarioRol
  cambiarEstadoUsuarioRolGeneral(id: number) {
    this.cambiarEstadoUsuarioRol(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(data:UsuarioRolModel)=>{
        if(data.status){
          Swal.fire({
            title: 'Estado cambiado',
            text: data.message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
        }
      },
      error:(err:any)=>{
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: err.error.message,
          icon: 'error',
        })
      }
    })
  }







}



