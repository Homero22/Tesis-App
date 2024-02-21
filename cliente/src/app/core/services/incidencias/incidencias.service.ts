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


  private destroy$ = new Subject<any>();
  private dataMetadata$ = new Subject<DataMetadata>();
  private verIncidencia$ = new Subject<IncidenciasModelBody>();

  metaData!: DataMetadata;
  incidencias! : IncidenciasModelBody [];
  verIncidencia! : IncidenciasModelBody;



  setDataMetadata(data:DataMetadata){
    this.dataMetadata$.next(data);
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
    console.log("llega");
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



      //funcion general de obtener incidencias

      obtenerIncidencias(params:any){
        this.getVulnerabilidades(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(data: IncidenciasModel)=>{
            this.incidencias = data.body;
            this.metaData = data.metadata;
            this.setDataMetadata(this.metaData)
            console.log("llega inci", this.incidencias)
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

      buscarIncidenciasGeneral(search:string, page:number){

      }
      filtrarIncidenciasGeneral(filtro:string, page:number){

      }

}

