

import config from "config/config";

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MiCuentaModel, MiCuentaModelBody } from "../../models/usuarios/miCuentaModel";
import { UsuarioEditadoModel, UsuarioModel, UsuariosModel, UsuariosModelBody } from "../../models/usuarios/usuariosModel";
import { DataCentralizada, UsuarioCentralizadaModel } from "../../models/usuarios/usuarioCentralizadaModel";
import { DataMetadata } from "../../models/metadata";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService{



    //Rutas para hacer las peticiones al backend
    private urlApi_me: string = config.URL_API_BASE + "usuarios/miCuenta";
    private urlApi_usuarios: string = config.URL_API_BASE + "usuarios";
    private urlApi_desactivar_usuario: string = config.URL_API_BASE + "usuarios/desactivar";
    private urlApi_buscar_usuario: string = config.URL_API_BASE + "usuarios/buscar";
    private urlApi_buscar_usuario_registrado: string = config.URL_API_BASE + "usuarios/buscar/registrado";
    private urlApi_filtrar_usuario: string = config.URL_API_BASE + "usuarios/filtrar";



    constructor(private http: HttpClient){}


    getMe(){
      return this.http.get<MiCuentaModel>(this.urlApi_me ,
        {
          withCredentials: true
        }
      );


    }

    dataMiCuenta : MiCuentaModelBody = {
      int_usuario_id:0,
      str_usuario_nombres:'',
      str_usuario_apellidos:'',
      str_usuario_email:'',
      str_usuario_cedula:'',
      str_usuario_estado:'',
      str_usuario_telefono:''
    }

    initUsuario:UsuariosModelBody={
      int_usuario_id:0,
      str_usuario_nombres:'',
      str_usuario_apellidos:'',
      str_usuario_email:'',
      str_usuario_cedula:'',
      str_usuario_estado:'',
      str_usuario_telefono:''
    }

    usuarios! : UsuariosModelBody [];
    usuario! : UsuariosModelBody;
    metaData!: DataMetadata;
    verPerfil:boolean = false;

    private dataMetadata$ = new Subject<DataMetadata>();
    private destroy$ = new Subject<any>();
    private dataUsuarios$ = new Subject<UsuariosModelBody[]>();
    private updateUsuario$ = new BehaviorSubject<UsuariosModelBody>( this.initUsuario);
    private verPerfil$ = new BehaviorSubject<boolean>(this.verPerfil);
    private usuario$ = new Subject<UsuariosModelBody>();
    private usuarioLogueado$ = new BehaviorSubject<MiCuentaModelBody>(this.dataMiCuenta);

    setUsuarioLogueado(data:MiCuentaModelBody){

      this.usuarioLogueado$.next(data);
    }

    get selectUsuarioLogueado$(){
      return this.usuarioLogueado$.asObservable();
    }

    setUsuario(data:UsuariosModelBody){
      this.usuario = data;
    }

    get selectUsuario$(){
      return this.usuario$.asObservable();
    }

    setVerPerfil(data:boolean){
      this.verPerfil$.next(data);
    }

    get selectVerPerfil$(){
      return this.verPerfil$.asObservable();
    }

    setDataMetadata(data:DataMetadata){
      this.dataMetadata$.next(data);
    }
    get selectMetadata$(){
      return this.dataMetadata$.asObservable();
    }

    setUsuarios(data:UsuariosModelBody[]){
      this.dataUsuarios$.next(data);
    }
    get selectUsuarios$(){
      return this.dataUsuarios$.asObservable();
    }

    setUpdateUsuario(data:UsuariosModelBody){
      this.updateUsuario$.next(data);
    }
    get selectUpdateUsuario$(){
      return this.updateUsuario$.asObservable();
    }




    //Obtener usuarios
    getUsuarios(params: any){
      let httpParams = new HttpParams()
      .set("page", params.page)
      .set("limit", params.limit);

      return this.http.get<UsuariosModel>(this.urlApi_usuarios,
        {
          params: httpParams,
          withCredentials: true
        }
      );

    }

    //Editar usuario
    editarUsuario(_id:number,_telefono:string){
      return this.http.put<UsuarioEditadoModel>(`${this.urlApi_usuarios}/${_id}`,
        {
          telefono:_telefono
        },
        {
          withCredentials: true
        }
        )
    }

    //Obtener usuario por id
    getUsuario(_id:number){
      return this.http.get<UsuarioModel>(`${this.urlApi_usuarios}/${_id}`,
        {
          withCredentials: true
        }
      );
    }

    //Cambiar estado de usuario
    cambiarEstadoUsuario(_id:number){
      return this.http.put<UsuarioEditadoModel>(`${this.urlApi_desactivar_usuario}/${_id}`,
        {
          withCredentials: true
        }
        )
    }
    //Buscar usuario
    buscarUsuario(_texto:string,page : number){
      let httpParams = new HttpParams()
      .set("texto",_texto)
      .set("page",page);
      return this.http.get<UsuariosModel>(`${this.urlApi_buscar_usuario}`,
        {
          params: httpParams,
          withCredentials: true
        }
      );

    }

    //obtener las 10 primeras coincidencias de la busqueda
    searchUsuario(_search: any): Observable<any> {

      let httpParams = new HttpParams()
      .set("texto",_search)
      return this.http.get<UsuariosModel>(`${this.urlApi_buscar_usuario_registrado}`,
        {
          params: httpParams,
          withCredentials: true
        }
      );
    }

    //Filtrar usuarios
    filtrarUsuarios(_filtro:string, page : number){
      let httpParams = new HttpParams()
      .set("filtro",_filtro)
      .set("page",page);
      return this.http.get<UsuariosModel>(`${this.urlApi_filtrar_usuario}`,
        {
          params: httpParams,
          withCredentials: true
        }
      );

    }

    //Obtener usuario centralizada
    getUsuarioCentralizada(_cedula:string){
      return this.http.get<UsuarioCentralizadaModel>(`${this.urlApi_usuarios}/centralizada/${_cedula}`,
        {
          withCredentials: true
        }
      );
    }

    //Crear usuario
    crearUsuario(cedula:string, telefono:string, idRol:number){
      return this.http.post<UsuarioModel>(`${this.urlApi_usuarios}`,
        {
          cedula:cedula,
          telefono:telefono,
          idRol:idRol
        },
        {
          withCredentials: true
        }
      );
    }

    //funcion general de obtener usuarios

    obtenerUsuarios(params:any){
      this.getUsuarios(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(data: UsuariosModel)=>{
          this.usuarios = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData)
          this.setUsuarios(this.usuarios)
        },
        error:(err)=>{
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        }
      })
    }

    //funcion general de buscar usuarios
    buscarUsuariosGeneral(_texto:string, page:number){
      this.buscarUsuario(_texto,page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(data: UsuariosModel)=>{
          this.usuarios = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData)
          this.setUsuarios(this.usuarios)
        },
        error:(err)=>{
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        }
      })
    }

    //funcion general de filtrar usuarios
 filtrarUsuariosGeneral(_filtro:string,page : number){
      this.filtrarUsuarios(_filtro,page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(data: UsuariosModel)=>{
          this.usuarios = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData)
          this.setUsuarios(this.usuarios)
        },
        error:(err)=>{
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        }
      })
    }

}
