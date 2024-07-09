import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { DataMetadata } from "../../models/metadata";
import Swal from "sweetalert2";
import { TicketModel } from '../../models/incidencias/ticketModel';
import { TicketModelBody } from '../../models/incidencias/ticketModel';
import { UsuarioCentralizadaModel } from '../../models/usuarios/usuarioCentralizadaModel';
import { Router } from "@angular/router";
import { DataReporteTickets } from "../../models/incidencias/dataReporteTickets";

@Injectable({
  providedIn: 'root'
})

export class TicketService{

  constructor(private http:HttpClient
    ,private router: Router
  ) {}

  private urlApi_tickets: string = config.URL_API_BASE + 'tickets';
  private urlApi_buscar_tickets: string = config.URL_API_BASE + 'tickets/buscar';
  private urlApi_filtrar_tickets: string = config.URL_API_BASE + 'tickets/filtrar';
  private urlApi_seguimiento_ticket: string = config.URL_API_BASE + 'seguimiento';


  private destroy$ = new Subject<any>();
  private dataMetadata$ = new Subject<DataMetadata>();
  private verTicket$ = new Subject<TicketModelBody>();
  private editarTicket$ = new BehaviorSubject<any>({});
  private aggSolucionTicket$ =new BehaviorSubject<any>({})
  private isTicketUsuario$ = new BehaviorSubject<boolean>(false);
  private solucionesTicket$ = new BehaviorSubject<any>({

  });

  private seguimientoTicket$ = new BehaviorSubject<any>({
    vacio: true
  });
  private seguimientoTicketInfo$ = new BehaviorSubject<any>({
    vacio: true
  });

  private solucionTicketUsuario$ = new BehaviorSubject<any>({
    vacio: true
  });

  private rol$ = new BehaviorSubject<string>('');

  private tabSelected$ = new Subject<number>();

  metaData!: DataMetadata;
  tickets! : any[];
  verTicket! : TicketModelBody;
  editarTicket!:any;
  isTicketUsuario: boolean = false;


  private ticketsReportes$ = new BehaviorSubject<DataReporteTickets[]>([]
  );



  ticketsUsuario!: any[];

  setSeguimientoTicketInfo(data:any){
    this.seguimientoTicketInfo$.next(data);
  }
  get selectSeguimientoTicketInfo$(){
    return this.seguimientoTicketInfo$.asObservable();
  }

  setTicketsReportes(data:any){
    this.ticketsReportes$.next(data);
  }
  get selectTicketsReportes$(){
    return this.ticketsReportes$.asObservable();
  }

  setSolucionTicketUsuario(data:any){
    this.solucionTicketUsuario$.next(data);
  }
  get selectSolucionTicketUsuario$(){
    return this.solucionTicketUsuario$.asObservable();
  }

  setRol(data:string){
    this.rol$.next(data);
  }
  get selectRol$(){
    return this.rol$.asObservable();
  }
  setSeguimientoTicket(data:any){
    this.seguimientoTicket$.next(data);
  }
  get selectSeguimientoTicket$(){
    return this.seguimientoTicket$.asObservable();
  }

  setTabSelected(data:number){
    this.tabSelected$.next(data);
  }
  setSolucionesTicket(data:any){
    this.solucionesTicket$.next(data);
  }
  get selectSolucionesTicket$(){
    return this.solucionesTicket$.asObservable();
  }
  setIsTicketUsuario(data:boolean){
    this.isTicketUsuario$.next(data);
  }
  get selectIsTicketUsuario$(){
    return this.isTicketUsuario$.asObservable();
  }

  get selectTabSelected$(){
    return this.tabSelected$.asObservable();
  }
  setAddSolucionTicket(data:any){
    this.aggSolucionTicket$.next(data);
  }
  get selectAddSolucionTicket$(){
    return this.aggSolucionTicket$.asObservable();
  }

  setDataMetadata(data:DataMetadata){
    this.dataMetadata$.next(data);
  }
  setTickets(data:TicketModelBody[]){
    this.tickets = data;
  }
  setTicketsUsuario(data:any[]){
    this.ticketsUsuario =data;
  }

  get selectMetadata$(){
    return this.dataMetadata$.asObservable();
  }

  get selectVerTicket$(){
    return this.verTicket$.asObservable();
  }

  setVerTicket(data:any){
    this.verTicket = data;

  }
  setEditarTicket(data:any){
    this.editarTicket$.next(data);
  }

  get selectEditarTicket$(){
    return this.editarTicket$.asObservable();
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
  //Obtener Tickets por fechas y estado
  getTicketsByDate(params: any){

    let httpParams = new HttpParams()
    .set('fechainicio', params.fechainicio)
    .set('fechafin', params.fechafin)
    .set('estado', params.estado);

    return this.http.get<any>(this.urlApi_tickets + '/reporte',
      {
        params: httpParams,
        withCredentials: true
      }
    )
  }
  //Pasar ticket
  pasarTicket(ticketId: any, data: any){
    return this.http.patch<any>(this.urlApi_tickets + '/' + ticketId,
      {
        int_usuario_id: data.usuarioId,
        int_ticket_usuario_id: data.ticketUsuarioId
      },
      {
        withCredentials: true
      }
    );
  }

  //editar ticket
  updateTicket(ticket_id: number, ticket: any){
   return this.http.put<any>(this.urlApi_tickets + '/' + ticket_id,
   {
      str_ticket_observacion: ticket
   },
    {
      withCredentials: true
    }
   );
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

  //obtener seguimiento de un ticket
  obtenerSeguimientoTicket(ticket_id: number){
    return this.http.get<any>(`${this.urlApi_seguimiento_ticket}/${ticket_id}`,
      {
        withCredentials: true
      }
    )
  }

  //finalizarTicket
  finalizarTicket(ticket_id:number){
    return this.http.put<any>(this.urlApi_tickets + '/finalizar/' + ticket_id,
      {
        withCredentials: true
      }
    )
  }

  //enviarRevisionTicket
  enviarRevisionTicket(ticket_id:number){
    return this.http.put<any>(this.urlApi_tickets + '/revision/' + ticket_id,
      {
        withCredentials: true
      }
    )
  }

  //funcion general para enviar ticket a revision
  enviarRevision(ticket_id: number){
    this.enviarRevisionTicket(ticket_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        if(data.status){
          Swal.fire({
            title: 'Ticket enviado a revisión',
            icon: 'success',
            text: data.message
          });
        }else{
          Swal.fire({
            title: 'Error al enviar a revisión',
            icon: 'error',
            text: data.message
          });
        }

      },
      error: (err) => {
        Swal.fire({
          title: 'Error al enviar a revisión',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }

  //funcion general para obtener seguimiento de un ticket
  obtenerSeguimiento(ticket_id: number){
    this.obtenerSeguimientoTicket(ticket_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.setSeguimientoTicket(data);

        this.router.navigate(['incidencias/seguimiento']);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al obtener seguimiento',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }

  //funcion general para getTicketsByDate
  obtenerTicketsByDate(params: any){
    this.getTicketsByDate(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        Swal.close();
        if(data.status){
          Swal.fire({
            title: 'Tickets encontrados',
            icon: 'success',
            text: data.message
          });
          this.tickets = data.body;
          this.setTicketsReportes(data.body);

        }else{
          Swal.fire({
            title: 'Sin tickets',
            icon: 'info',
            text: data.message
          });
        }
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




  //Ticket_usuario

  //rutas
  private urlApi_tickets_usuario: string = config.URL_API_BASE + 'tickets/usuario';
  private urlApi_tickets_soluciones : string = config.URL_API_BASE + 'tickets/soluciones';
  private urlApi_tickets_solucion : string = config.URL_API_BASE + 'tickets/usuario/solucion';

  //Obtener tickets
  getTicketsUsuarioPaginacion(params: any){
    let httpParams = new HttpParams()
    .set('page', params.page)
    .set('limit', params.limit);

    return this.http.get<TicketModel>(`${this.urlApi_tickets_usuario}/${params.rol}`,
      {
        params: httpParams,
        withCredentials: true
      }
    )
  }

  //Obtener las soluciones de un ticket en especifico
  getSolucionesTicket(ticket_id: number){
    return this.http.get<any>(`${this.urlApi_tickets_soluciones}/${ticket_id}`,
      {
        withCredentials: true
      }
    )
  }

  //agregar solucion a un ticket
  addSolucionTicket(ticket:any){
    return this.http.post<any>( this.urlApi_tickets_solucion, ticket,
      {
        withCredentials: true,
      }
    );
  }

    //obtener TicketUsuario by Id
    getTicketUsuarioById(id: number){
      return this.http.get<UsuarioCentralizadaModel>(this.urlApi_tickets_usuario + '/solucion/' + id,
        {
          withCredentials: true
        }
      )
    }

    //cambiar estado del TicketUsuario
    cambiarEstadoTicketUsuario(id: number){
      return this.http.put<any>(this.urlApi_tickets_usuario + '/estado/' + id,
        {
          withCredentials: true
        }
      )
    }



  //funcion general para obtener tickets
  obtenerTicketsUsuario(params: any){
    this.getTicketsUsuarioPaginacion(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.ticketsUsuario = data.body;
        this.metaData = data.metadata;
        this.setDataMetadata(data.metadata);
        this.setTicketsUsuario(data.body);

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

  //funcion general para obtener soluciones de un ticket
  obtenerSolucionesTicket(ticket_id: number){
    this.getSolucionesTicket(ticket_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.setSolucionesTicket(data);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al obtener soluciones',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }

  //funcion general para obtener TicketUsuario by Id
  obtenerTicketUsuarioById(id: number){
    this.getTicketUsuarioById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.setSolucionTicketUsuario(data);

      },
      error: (err) => {
        Swal.fire({
          title: 'Error al obtener ticket',
          icon: 'error',
          text: err.error.message
        });
        console.log(err);
      }
    })
  }






}
