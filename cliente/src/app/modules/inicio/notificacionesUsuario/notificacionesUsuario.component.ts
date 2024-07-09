import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificacionesService } from 'src/app/core/services/incidencias/notificaciones.service';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import Swal from 'sweetalert2';

interface Notificacion {
  int_notificacion_id: string;
  int_usuario_id: string;
  str_notificacion_titulo: string;
  str_notificacion_descripcion: string;
  dt_fecha_creacion: string;
}
@Component({
  selector: 'app-notificacionesUsuario',
  templateUrl: './notificacionesUsuario.component.html',
  styleUrls: ['./notificacionesUsuario.component.css']
})
export class NotificacionesUsuarioComponent implements OnInit {

  notificaciones = [] as Notificacion[];
  rol!: string;
  private destroy$ = new Subject<any>();
  constructor(
    private srvNotificaciones: NotificacionesService,
    private srvTicket: TicketService
  ) { }

  ngOnInit() {
    this.srvTicket.selectRol$.subscribe((rol) => {
      this.rol = rol;
      if(rol != ""){
        this.srvNotificaciones.getNotificacionesUsuario(rol).subscribe((res) => {
          this.notificaciones = res.body;
        });
      }
    });



  }

  eliminarNotificacion(index: number) {
    let id = this.notificaciones[index].int_notificacion_id;
    this.notificaciones.splice(index, 1);
    //obtengo el id de la notificacion



    this.srvNotificaciones.deleteNotificacionUsuario(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {

        if(res.status){
          Swal.fire({
            icon: 'success',
            title: 'Notificación eliminada',
            showConfirmButton: false,
            timer: 500
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar la notificación',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
