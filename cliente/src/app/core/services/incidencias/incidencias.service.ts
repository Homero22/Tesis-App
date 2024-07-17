import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { Subject, takeUntil } from "rxjs";
import { DataMetadata } from "../../models/metadata";
import Swal from "sweetalert2";
import { IncidenciasModel, IncidenciasModelBody } from "../../models/incidencias/incidenciasModel";




@Injectable({
  providedIn: 'root'
})

export class IncidenciasService{

  constructor(private http:HttpClient) {}

  private urlApi_incidencias: string = config.URL_API_BASE + 'vulnerabilidades';
  private urlApi_buscar_incidencias: string = config.URL_API_BASE + 'vulnerabilidades/buscar';
  private urlApi_filtrar_incidencias: string = config.URL_API_BASE + 'vulnerabilidades/filtrar';


  private destroy$ = new Subject<any>();
  private dataMetadata$ = new Subject<DataMetadata>();
  private verIncidencia$ = new Subject<IncidenciasModelBody>();

  private tabSelected$ = new Subject<number>();

  metaData!: DataMetadata;
  incidencias! : IncidenciasModelBody [];
  verIncidencia! : IncidenciasModelBody;

  setTabSelected(data:number){
    this.tabSelected$.next(data);
  }

  get selectTabSelected$(){
    return this.tabSelected$.asObservable();
  }





  setDataMetadata(data:DataMetadata){
    this.dataMetadata$.next(data);
  }
  setIncidencias(data:IncidenciasModelBody[]){
    this.incidencias = data;
  }

  get selectMetadata$(){
    return this.dataMetadata$.asObservable();
  }
  get selectVerIncidencia$(){
    return this.verIncidencia$.asObservable();
  }

  setVerIncidencia(data:IncidenciasModelBody){
    this.verIncidencia = data;
  }

  postFileData(file:any){

    return this.http.post<any>( this.urlApi_incidencias, file,
      {
        withCredentials: true,
      }
    );
  }

  getVulnerabilidades(params:any){
    let httpParams  = new HttpParams()
    .set('page', params.page)
    .set('limit', params.limit);
    return this.http.get<any>( this.urlApi_incidencias,
      {
        params: httpParams,
        withCredentials: true,
      }
    );
  }

  //buscar incidencias
  buscarIncidencias(_texto:string, page:number){
    let httpParams = new HttpParams()
    .set('texto', _texto)
    .set('page', page);
    return this.http.get<IncidenciasModel>( this.urlApi_buscar_incidencias,
      {
        params: httpParams,
        withCredentials: true,
      }
    );
  }

  //filtrar incidencias

  filtrarIncidencias(filtro:string, page:number){
    let httpParams = new HttpParams()
    .set('filtro', filtro)
    .set('page', page);

    return this.http.get<IncidenciasModel>( this.urlApi_filtrar_incidencias,
      {
        params: httpParams,
        withCredentials: true,
      }

    );
  }




      //funcion general de obtener incidencias

      obtenerIncidencias(params:any){
        this.getVulnerabilidades(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(data: IncidenciasModel)=>{
            this.incidencias = data.body;
            this.metaData = data.metadata;
            this.setDataMetadata(this.metaData)

            // this.setUsuarios(this.usuarios)
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

      buscarIncidenciasGeneral(_texto:string, page:number){
        this.buscarIncidencias(_texto, page)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(data: IncidenciasModel)=>{
            this.incidencias = data.body;
            this.metaData = data.metadata;
            this.setDataMetadata(this.metaData)
            // this.setIncidencias(this.incidencias)
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



      filtrarIncidenciasGeneral(filtro:string, page:number){
        this.filtrarIncidencias(filtro, page)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(data: IncidenciasModel)=>{
            this.incidencias = data.body;
            this.metaData = data.metadata;
            this.setDataMetadata(this.metaData)
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

