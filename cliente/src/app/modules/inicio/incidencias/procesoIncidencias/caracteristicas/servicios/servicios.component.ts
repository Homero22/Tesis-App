import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ServiciosModelBody } from 'src/app/core/models/incidencias/servicios';
import { DataMetadata } from 'src/app/core/models/metadata';
import { ServiciosService } from 'src/app/core/services/incidencias/servicios.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  isData: boolean = false;
  request = false;
  isLoading: boolean = true;
  currentPage: number = 1;
  private destroy$ = new Subject<any>();

  constructor(
    public srvServicios: ServiciosService,
    public srvModal: ModalService
  ) {}

  status!: boolean;
  buscando: boolean = false;
  filtrando: boolean = false;
  searchText: string = '';
  placeholder: string = 'Buscar servicio';
  actualizarPaginacion: number = 0;
  loading: boolean = false;
  filtros: any[] = ['Ver servicios activos', 'Ver servicios inactivos'];
  metadata!: DataMetadata;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  filtroActual: string = 'Ver todo';

  ngOnInit() {
    this.request = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 400);

    this.srvServicios.obtenerServicios({
      page: 1,
      limit: 10,
    });

    this.srvServicios.selectServicios$.subscribe((data) => {
      this.srvServicios.servicios = data;
      if (data.length > 0) {
        this.isData = true;
        this.srvServicios.selectMetadata$.subscribe((data) => {
          this.metadata = data;
          this.srvServicios.metaData = data;
          this.currentPage = data.pagination.currentPage;
        });
      }
    });
  }

  buscarServicio(search: string) {
    this.searchText = search;
    this.buscando = true;
    if (search != '') {
      Swal.fire({
        title: 'Buscando...',
        icon: 'question',
        timer: 900,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if (search === '') {
      this.srvServicios.obtenerServicios({
        page: 1,
        limit: 10,
      });
      this.verificarData();
    } else {
      this.srvServicios.buscarServicios({
        texto: search,
        page: 1,
      });
      this.verificarData();
    }
  }
  verificarData() {
    if (this.srvServicios.metaData.pagination.total === 0) {
      console.log(this.srvServicios.metaData.pagination.total);
      this.isData = false;
    } else {
      this.isData = true;
    }
  }

  filtrarServicio(filtro: string) {
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon: 'success',
      timer: 900,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    switch (filtro) {
      case 'Ver servicios activos':
        this.filtroActual = 'Ver servicios activos';
        this.filtrando = true;
        this.srvServicios.filtrarServicios('ACTIVO', 1);
        this.verificarData();
        break;
      case 'Ver servicios inactivos':
        this.filtroActual = 'Ver servicios inactivos';
        this.filtrando = true;
        this.srvServicios.filtrarServicios('INACTIVO', 1);
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.filtrando = true;
        this.srvServicios.obtenerServicios({
          page: 1,
          limit: 10,
        });
        this.verificarData();
        break;
    }
  }
  changePage(page: number) {
    this.currentPage = page;
    //comprobar si se esta filtrando para cambiar de pagina
    if (this.filtroActual === 'Ver servicios activos') {
      this.srvServicios.filtrarServicio('ACTIVO', page);
    }
    if (this.filtroActual === 'Ver servicios inactivos') {
      this.srvServicios.filtrarServicio('INACTIVO', page);
    }
    if (this.searchText !== '') {
      this.srvServicios.buscarServicio(this.searchText, page);
    }
    if (this.filtroActual === 'Ver todo' && this.searchText === '') {
      this.srvServicios.obtenerServicios({
        page: page,
        limit: 10,
      });
    }
  }
  txtMensaje: string = '';
  txtTitulo: string = '';
  estado: string = '';
  cambiarEstado(id: number, nuevoEstado: string) {
    if(nuevoEstado === 'ACTIVO'){
      this.estado = 'INACTIVO'
      this.txtMensaje ='Al deshabilitar un servicio no se podrá eligir para nuevos procesos'
      this.txtTitulo = '¿Está seguro que desea desactivar este Servicio?'
    }else if( nuevoEstado === 'INACTIVO'){
      this.estado = 'ACTIVO'
      this.txtMensaje ='Con este cambio se podrá asignar a nuevos procesos'
      this.txtTitulo = '¿Está seguro que desea activar este Servicio?'
    }
    Swal.fire({
      title: this.txtTitulo,
      text: this.txtMensaje,
      showDenyButton: true,
      confirmButtonText: `Si, cambiar`,
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.buscando = false;
        this.filtrando = false;
        this.srvServicios.cambiarEstadoServicio(id, this.estado)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if(data.status){
              console.log(data);
              Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.srvServicios.obtenerServicios({
                page: 1,
                limit: 10,
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        })
      }
    });
  }

  editarServicio(servicio: ServiciosModelBody, title: string, form: string) {
    this.buscando = false;
    this.filtrando = false;

    this.elementForm ={
      formulario: form,
      title: title,
      special: false,
    };
    this.srvServicios.setUpdataServicio(servicio);
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
    }


  addServicio(tittle: string, form: string) {
    console.log('Añadiendo servicio');
    this.srvModal.setFormModal({
      formulario: form,
      title: tittle,
      special: false,
    });
    this.srvModal.openModal();
  }
}
