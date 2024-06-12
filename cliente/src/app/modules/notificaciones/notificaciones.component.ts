import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import config from 'config/config';
import { LogoutComponent } from '../pages/logout/logout.component';
import { UsuariosService } from 'src/app/core/services/Usuarios/usuarios.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  eventSource: EventSource;
  notifications: string[] = [];
  noti: string = '';
  id_usuario_logueado: any;
  isNuevaNoti = false;
  moverDerecha: { [key: number]: boolean } = {};
  @ViewChild('notificacionContainer') notificacionContainer:
    | ElementRef
    | undefined;

  num = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private srvMiCuenta: UsuariosService
  ) {
    this.eventSource = new EventSource(
      config.URL_API_BASE + 'notificaciones/suscribir'
    );

    this.eventSource.onmessage = (event) => {
      let obj = JSON.parse(event.data);
      this.obtenerId();
      if (obj.int_usuario_id == this.id_usuario_logueado) {
        console.log('DATA PARA UN USUARIO', obj);
        //aqui llega el int_usuario_id para mostrar o no la notificacion si es para el usuario

        //verifico que si tiene 4 notificaciones, elimino la primera
        if (this.notifications.length >= 4) {
          this.notifications.shift();
          this.cdr.detectChanges();
        }
        this.num = this.num + 1;
        this.notifications.push(this.num + ' ' + obj.mensaje);
        this.cdr.detectChanges();

        this.moverDerecha[this.notifications.length - 1] = false;
        this.cdr.detectChanges();

        // Agregar la clase después de 4 segundos
        setTimeout(() => {
          //poner en tru el index
          this.moverDerecha[0] = true;
          setTimeout(() => {
            this.eliminarNotificacion();
            this.cdr.detectChanges();
          }, 1000);
          this.cdr.detectChanges();
        }, 10000); //
      }
    };
  }

  eliminarNotificacion() {
    this.notifications.shift(); // Elimina el primer elemento del array
  }

  cerrarCard(index: any) {
    this.noti = '';
    this.notifications.splice(index, 1);
    this.cdr.detectChanges();
  }

  ngOnInit() {

  }

  obtenerId(){
    this.srvMiCuenta.selectUsuarioLogueado$.subscribe((data) => {
      this.id_usuario_logueado = data.int_usuario_id;
      console.log('ID USUARIO LOGUEADO', this.id_usuario_logueado);
    });
  }

  ngOnDestroy() {
    this.eventSource.close();
  }
}
