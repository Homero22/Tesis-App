import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacionesUsuario',
  templateUrl: './notificacionesUsuario.component.html',
  styleUrls: ['./notificacionesUsuario.component.css']
})
export class NotificacionesUsuarioComponent implements OnInit {

  notificaciones = [
    {
      titulo: 'Notificación 1',
      descripcion: 'Descripción de la notificación 1',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 2',
      descripcion: 'Descripción de la notificación 2',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 3',
      descripcion: 'Descripción de la notificación 3',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 4',
      descripcion: 'Descripción de la notificación 4',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 5',
      descripcion: 'Descripción de la notificación 5 lorem Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. ',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 6',
      descripcion: 'Descripción de la notificación 6',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 7',
      descripcion: 'Descripción de la notificación 7',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 8',
      descripcion: 'Descripción de la notificación 8',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 9',
      descripcion: 'Descripción de la notificación 9',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 10',
      descripcion: 'Descripción de la notificación 10',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 11',
      descripcion: 'Descripción de la notificación 11',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 12',
      descripcion: 'Descripción de la notificación 12',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 13',
      descripcion: 'Descripción de la notificación 13',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 14',
      descripcion: 'Descripción de la notificación 14',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 15',
      descripcion: 'Descripción de la notificación 15',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 16',
      descripcion: 'Descripción de la notificación 16',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 17',
      descripcion: 'Descripción de la notificación 17',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 18',
      descripcion: 'Descripción de la notificación 18',
      fecha: '2019-10-10'
    },
    {
      titulo: 'Notificación 19',
      descripcion: 'Descripción de la notificación 19',
      fecha: '2019-10-10'
    },
  ];


  constructor() { }

  ngOnInit() {

  }

  eliminarNotificacion(index: number) {
    this.notificaciones.splice(index, 1);
  }

}
