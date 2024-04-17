import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { DataMetadata } from "../../models/metadata";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { ServiciosModel, ServiciosModelBody } from "../../models/incidencias/servicios";

@Injectable({
  providedIn: 'root'
})

export class ServiciosService{
  // Rutas para hacer las peticiones al backend
  private urlApi_servicios: string = config.URL_API_BASE + "servicios";
  private urlApi_all_servicios: string = config.URL_API_BASE + "servicios/all";
  private urlApi_desactivar_servicio: string = config.URL_API_BASE + "servicios/desactivar";
  private urlApi_buscar_servicio: string = config.URL_API_BASE + "servicios/buscar";
  private urlApi_filtrar_servicio: string = config.URL_API_BASE + "servicios/filtrar";

  constructor(private http: HttpClient) {}

  allServicios!: any[];
  servicios!: ServiciosModelBody[];
  metaData!: DataMetadata;

  private dataMetadata$ = new Subject<DataMetadata>();
  private destroy$ = new Subject<any>();
  private dataServicios$ = new Subject<any[]>();
  private updateServicio$ = new BehaviorSubject<ServiciosModelBody>({
    str_servicio_estado: "",
    int_servicio_id: 0,
    str_servicio_nombre: "",
    dt_fecha_creacion: "",
  });
  private allServicios$ = new Subject<any[]>();

  setAllServicios(data: ServiciosModelBody[]) {
    this.allServicios$.next(data);
  }
  get selectUpdateServicio$() {
    return this.updateServicio$.asObservable();
  }

  get selectAllServicios$() {
    return this.allServicios$.asObservable();
  }

  setUpdataServicio(data: any) {
    this.updateServicio$.next(data);
  }

  setDataMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectMetadata$() {
    return this.dataMetadata$.asObservable();
  }

  setServicios(data: ServiciosModelBody[]) {
    this.dataServicios$.next(data);
  }

  get selectServicios$() {
    return this.dataServicios$.asObservable();
  }

  // Obtener servicios

  getServicios(params: any){
    let httpParams = new HttpParams()
    .set('page', params.page)
    .set('limit', params.limit);

   return this.http.get<ServiciosModel>(this.urlApi_servicios, {
      params: httpParams,
      withCredentials: true
    })
  }

  //Obtener todos los servicios
  getAllServicios(){
    return this.http.get<ServiciosModel>(this.urlApi_all_servicios, {
      withCredentials: true
    });
  }

  // Editar servicio
  editarServicio(_id: number, _nombre: string){
    console.log("editar", _id, _nombre)

    return this.http.put<ServiciosModel>(
      `${this.urlApi_servicios}/${_id}`,
      {
        nombre: _nombre
      },
      {
        withCredentials: true
      }
    );
  }

  //Obtener servicio por id
  getServicio(_id: number){
    return this.http.get<ServiciosModel>(`${this.urlApi_servicios}/${_id}`, {
      withCredentials: true
    });
  }

  //Cambiar estado del servicio
  cambiarEstadoServicio(_id: number, _estado: string){
    return this.http.put<ServiciosModel>(
      `${this.urlApi_desactivar_servicio}/${_id}`,
      {
        estado: _estado
      },
      {
        withCredentials: true
      }
    );
  }

  //Buscar servicio

  buscarServicio(_texto: string, page: number){
    let httpParams = new HttpParams()
    .set('texto', _texto)
    .set('page', page);
    console.log("?!", _texto, page)

    return this.http.get<ServiciosModel>(this.urlApi_buscar_servicio, {
      params: httpParams,
      withCredentials: true
    });
  }

  //Filtrar servicio

  filtrarServicio(_filtro: string, page: number){
    let httpParams = new HttpParams()
    .set('filtro', _filtro)
    .set('page', page);

    return this.http.get<ServiciosModel>(this.urlApi_filtrar_servicio, {
      params: httpParams,
      withCredentials: true
    });
  }

  //Crear servicio
  crearServicio(_nombre: string){
    return this.http.post<ServiciosModel>(
      this.urlApi_servicios,
      {
        nombre: _nombre
      },
      {
        withCredentials: true
      }
    );
  }

  // Funcion general de obtener servicios
  obtenerServicios(params: any){

    this.getServicios(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: ServiciosModel) => {
        this.servicios = data.body;
        console.log(this.servicios)
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setServicios(this.servicios);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });

  }

  //funcion general para filtrar servicios
  filtrarServicios(filtro: string, page: number){
    this.filtrarServicio(filtro, page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: ServiciosModel) => {
        this.servicios = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setServicios(this.servicios);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

  //funcion general para buscar servicios

  buscarServicios(params: any){
    console.log("buscar",params)
    this.buscarServicio(params.texto, params.page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: ServiciosModel) => {
        this.servicios = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setServicios(this.servicios);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

  //funcion general para obtener todos los servicios

  obtenerAllServicios(){
    this.getAllServicios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: ServiciosModel) => {
        this.allServicios = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(this.metaData);
        this.setAllServicios(this.allServicios);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }


}
