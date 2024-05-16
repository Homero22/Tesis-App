import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { Subject, takeUntil } from "rxjs";
import { DataMetadata } from "../../models/metadata";
import Swal from "sweetalert2";
import { TicketModel } from '../../models/incidencias/ticketModel';
import { TicketModelBody } from '../../models/incidencias/ticketModel';

@Injectable({
  providedIn: 'root'
})

export class TicketService{

  constructor(private http:HttpClient) {}

  private urlApi_tickets: string = config.URL_API_BASE + 'tickets';
  private urlApi_buscar_tickets: string = config.URL_API_BASE + 'tickets/buscar';
  private urlApi_filtrar_tickets: string = config.URL_API_BASE + 'tickets/filtrar';

  private destroy$ = new Subject<any>();
  private dataMetadata$ = new Subject<DataMetadata>();
  private verTicket$ = new Subject<TicketModelBody>();

  private tabSelected$ = new Subject<number>();

  metaData!: DataMetadata;
  tickets! : any[];
  verTicket! : TicketModelBody;

  setTabSelected(data:number){
    this.tabSelected$.next(data);
  }

  get selectTabSelected$(){
    return this.tabSelected$.asObservable();
  }

  setDataMetadata(data:DataMetadata){
    this.dataMetadata$.next(data);
  }
  setTickets(data:TicketModelBody[]){
    this.tickets = data;
  }

  get selectMetadata$(){
    return this.dataMetadata$.asObservable();
  }

  get selectVerTicket$(){
    return this.verTicket$.asObservable();
  }

  //Obtener tickets
  getTickets(params: any){
    let httpParams = new HttpParams()
    .set('page', params.page)
    .set('limit', params.limit);

    return this.http.get<TicketModel>(this.urlApi_tickets,
      {
        params: httpParams,
        withCredentials: true
      }
    )
  }

  crearTicket(ticket: any){
    return this.http.post<any>( this.urlApi_tickets, ticket,
      {
        withCredentials: true,
      }
    );
  }

  buscarTickets(search: string, page: number){
    let httpParams = new HttpParams()
    .set('texto', search)
    .set('page', page);

    return this.http.get<TicketModel>(this.urlApi_buscar_tickets,
      {
        params: httpParams,
        withCredentials: true
      }
    )
  }

  filtrarTickets(filtro: string, page: number){
    let httpParams = new HttpParams()
    .set('filtro', filtro)
    .set('page', page);

    return this.http.get<TicketModel>(this.urlApi_filtrar_tickets,
      {
        params: httpParams,
        withCredentials: true
      }
    )
  }

  //funcion general para obtener tickets
  obtenerTickets(params: any){
    this.getTickets(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: TicketModel) => {
        this.tickets = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(data.metadata);
        this.setTickets(data.body);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al obtener tickets',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }

  //funcion general para buscar tickets
  buscarTicketsGeneral(search: string, page: number){
    this.buscarTickets(search, page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: TicketModel) => {
        this.tickets = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(data.metadata);
        this.setTickets(data.body);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al buscar tickets',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }

  //funcion general para filtrar tickets

  filtrarTicketsGeneral(filtro: string, page: number){
    this.filtrarTickets(filtro, page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: TicketModel) => {
        this.tickets = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(data.metadata);
        this.setTickets(data.body);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al filtrar tickets',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }




}
