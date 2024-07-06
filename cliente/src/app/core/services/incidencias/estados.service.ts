import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { DataMetadata } from "../../models/metadata";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { EstadosModel, EstadosModelBody } from "../../models/incidencias/estados";


@Injectable({
  providedIn: 'root'
})

export class EstadosService {
  private urlApi_estados: string = config.URL_API_BASE + "estados";
  private urlApi_all_estados: string = config.URL_API_BASE + "estados/all";
  private urlApi_desactivar_estado: string = config.URL_API_BASE + "estados/desactivar";
  private urlApi_buscar_estado: string = config.URL_API_BASE + "estados/buscar";
  private urlApi_filtrar_estado: string = config.URL_API_BASE + "estados/filtrar";

  constructor(private http: HttpClient) {}

  allEstados!: EstadosModelBody[];
  estados!: EstadosModelBody[];
  metaData!: DataMetadata;

  private dataMetadata$ = new Subject<DataMetadata>();
  private destroy$ = new Subject<any>();
  private dataEstados$ = new Subject<EstadosModelBody[]>();
  private updateEstado$ = new BehaviorSubject<EstadosModelBody>({
    str_estado_estado: "",
    int_estado_id: 0,
    str_estado_nombre: "",
    dt_fecha_creacion: "",
  });
  private allEstados$ = new Subject<EstadosModelBody[]>();

  setAllEstados(data: EstadosModelBody[]) {
    this.allEstados$.next(data);
  }

  get selectAllEstados$() {
    return this.allEstados$.asObservable();
  }

  get selectUpdateEstado$() {
    return this.updateEstado$.asObservable();
  }

  setUpdataEstado(data: EstadosModelBody) {
    this.updateEstado$.next(data);
  }

  setDataMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectMetadata$() {
    return this.dataMetadata$.asObservable();
  }

  setEstados(data: EstadosModelBody[]) {
    this.dataEstados$.next(data);
  }

  get selectEstados$() {
    return this.dataEstados$.asObservable();
  }

  // Obtener estados

  getEstados(params: any){
    let httpParams = new HttpParams()
    .set('page', params.page)
    .set('limit', params.limit);

   return this.http.get<EstadosModel>(this.urlApi_estados, {
      params: httpParams,
      withCredentials: true
    })
  }

  // Obtener todos los estados
  getAllEstados(){
    return this.http.get<EstadosModel>(this.urlApi_all_estados, {
      withCredentials: true
    });
  }

  // Editar estado
  editarEstado(_id: number, _nombre: string){

    return this.http.put<EstadosModel>(
      `${this.urlApi_estados}/${_id}`,
      {
        nombre: _nombre
      },
      {
        withCredentials: true
      }
    );
  }

  // Obtener estado por id
  getEstado(_id: number){
    return this.http.get<EstadosModel>(`${this.urlApi_estados}/${_id}`, {
      withCredentials: true
    });
  }

  // Cambiar estado del estado
  // cambiarEstadoEstado(_id: number, estadoId: number){
  //   return this.http.put<EstadosModel>(
  //     `${this.urlApi_estados}/${_id}/estado`,
  //     { estadoId },
  //     {
  //       withCredentials: true
  //     }
  //   );
  // }
  //urlApi_desactivar_estado
  cambiarEstadoEstado(_id: number, _estado: string){
    return this.http.put<EstadosModel>(
      `${this.urlApi_desactivar_estado}/${_id}`,
      {
        estado: _estado
      },
      {
        withCredentials: true
      }
    );
  }

  // Buscar estado

  buscarEstado(_texto: string, page: number){
    let httpParams = new HttpParams()
    .set('texto', _texto)
    .set('page', page);

    return this.http.get<EstadosModel>(this.urlApi_buscar_estado, {
      params: httpParams,
      withCredentials: true
    });
  }

  // Filtrar estado

  filtrarEstado(_filtro: string, page: number){

    let httpParams = new HttpParams()
    .set('texto', _filtro)
    .set('page', page);

    return this.http.get<EstadosModel>(this.urlApi_filtrar_estado, {
      params: httpParams,
      withCredentials: true
    });
  }

  // Crear estado
  crearEstado(_nombre: string){
    return this.http.post<EstadosModel>(
      this.urlApi_estados,
      {
        nombre: _nombre
      },
      {
        withCredentials: true
      }
    );
  }

  // Funcion general de obtener estados
  obtenerEstados(params: any){

    this.getEstados(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: EstadosModel) => {
        this.estados = data.body;

        this.metaData = data.metadata;

        this.setDataMetadata(this.metaData);
        this.setEstados(this.estados);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });

  }

  // Funcion general para filtrar estados
  filtrarEstados(params: any){
    this.filtrarEstado(params.filtro, params.page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: EstadosModel) => {
        this.estados = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setEstados(this.estados);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

  // Funcion general para buscar estados

  buscarEstados(params: any){
    this.buscarEstado(params.texto, params.page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: EstadosModel) => {
        this.estados = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setEstados(this.estados);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

  // Funcion general para obtener todos los estados

  obtenerAllEstados(){
    this.getAllEstados()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: EstadosModel) => {
        this.allEstados = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setAllEstados(this.allEstados);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }
}
