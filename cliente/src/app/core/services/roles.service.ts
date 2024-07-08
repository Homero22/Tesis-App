import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { RolesModel, RolesModelBody } from "../models/roles";
import { DataMetadata } from "../models/metadata";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class RolesService {

// Rutas para hacer las peticiones al backend
private urlApi_roles: string = config.URL_API_BASE + "roles";
private urlApi_all_roles: string = config.URL_API_BASE + "roles/all";
private urlApi_desactivar_rol: string = config.URL_API_BASE + "roles/desactivar";
private urlApi_buscar_rol: string = config.URL_API_BASE + "roles/buscar";
private urlApi_filtrar_rol: string = config.URL_API_BASE + "roles/filtrar";

constructor(private http: HttpClient) {}

allRoles! : RolesModelBody[];

roles!: RolesModelBody[];
metaData!: DataMetadata;

private dataMetadata$ = new Subject<DataMetadata>();
private destroy$ = new Subject<any>();
private dataRoles$ = new Subject<RolesModelBody[]>();
private  updateRol$ = new BehaviorSubject<RolesModelBody>({
  str_rol_descripcion: "",
  int_rol_id: 0,
  str_rol_nombre: "",
  str_rol_estado: "",
});
private allRoles$ = new Subject<RolesModelBody[]>();

setAllRoles(data: RolesModelBody[]) {
  this.allRoles$.next(data);
}

get selectAllRoles$() {
  return this.allRoles$.asObservable();
}

setUpdataRol(data: RolesModelBody) {
  this.updateRol$.next(data);
}
get selectUpdateRol$() {
  return this.updateRol$.asObservable();
}


setDataMetadata(data: DataMetadata) {
  this.dataMetadata$.next(data);
}

get selectMetadata$() {
  return this.dataMetadata$.asObservable();
}

setRoles(data: RolesModelBody[]) {
  this.dataRoles$.next(data);
}

get selectRoles$() {
  return this.dataRoles$.asObservable();
}

// Obtener roles
getRoles(params: any) {
  let httpParams = new HttpParams()
    .set("page", params.page)
    .set("limit", params.limit);

  return this.http.get<RolesModel>(this.urlApi_roles, {
    params: httpParams,
    withCredentials: true,
  });
}
// Obtener todos los roles
getAllRoles() {
  return this.http.get<RolesModel>(this.urlApi_all_roles, {
    withCredentials: true,
  });
}

// Editar rol
editarRol(_id: number, _nombre: string, _descripcion: string) {
  return this.http.put<RolesModel>(
    `${this.urlApi_roles}/${_id}`,
    {
      nombre: _nombre,
      descripcion: _descripcion,
    },
    {
      withCredentials: true,
    }
  );
}

// Obtener rol por id
getRol(_id: number) {
  return this.http.get<RolesModel>(`${this.urlApi_roles}/${_id}`, {
    withCredentials: true,
  });
}

// Cambiar estado de rol
cambiarEstadoRol(_id: number) {
  return this.http.put<RolesModel>(
    `${this.urlApi_desactivar_rol}/${_id}`,
    {
      withCredentials: true,
    }
  );
}

// Buscar rol
buscarRol(_texto: string, page : number) {
  let httpParams = new HttpParams()
  .set("texto", _texto)
  .set("page", page);
  return this.http.get<RolesModel>(`${this.urlApi_buscar_rol}`, {
    params: httpParams,
    withCredentials: true,
  });
}

// Filtrar roles

filtrarRoles(_filtro: string, page: number) {
  const httpParams = new HttpParams()
  .set("filtro", _filtro)
  .set("page", page);

  return this.http.get<RolesModel>(`${this.urlApi_filtrar_rol}`, {
    params: httpParams,
    withCredentials: true,
  });
}



// Crear rol
crearRol(nombre: string, descripcion: string) {
  return this.http.post<RolesModel>(
    `${this.urlApi_roles}`,
    {
      nombre: nombre,
      descripcion: descripcion,
    },
    {
      withCredentials: true,
    }
  );
}

// Funcion general de obtener roles
obtenerRoles(params: any) {
  this.getRoles(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: RolesModel) => {
        this.roles = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setRoles(this.roles);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
}

//funcion general para filtrar roles
filtrarRolesGeneral(filtro: string, page: number) {
  this.filtrarRoles(filtro,page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: RolesModel) => {
        this.roles = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setRoles(this.roles);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
}

//funcionar general para buscar roles
buscarRolesGeneral(texto: string , page:number) {

  this.buscarRol(texto,page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: RolesModel) => {
        this.roles = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setRoles(this.roles);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

//funcion para obtener todos los roles
obtenerTodosRoles() {
  this.getAllRoles()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: RolesModel) => {
        this.allRoles = data.body;
        this.setAllRoles(this.allRoles);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

}
