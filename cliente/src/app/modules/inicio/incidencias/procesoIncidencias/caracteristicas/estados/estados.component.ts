import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { EstadosService } from 'src/app/core/services/incidencias/estados.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
  isData: boolean = false;
  request = false;
  isLoading: boolean = true;
  currentPage: number = 1;
  private destroy$ = new Subject<any>();

  constructor(
    public srvModal: ModalService,
    public srvEstados: EstadosService
  ) { }
  status!: boolean;
  buscando: boolean = false;
  filtrando: boolean = false;
  searchText: string = '';
  placeholder: string = 'Buscar estado';
  actualizarPaginacion: number = 0;
  loading: boolean = false;
  filtros: any[] = ['Ver estados activos', 'Ver estados inactivos'];
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

    this.srvEstados.obtenerEstados({
      page: 1,
      limit: 10,
    });

    this.srvEstados.selectEstados$
    .subscribe((data) => {
      if (data.length > 0) {
        this.isData = true;
        this.isLoading = false;
        this.srvEstados.selectMetadata$
        .subscribe((data) => {
          this.metadata = data;
          this.srvEstados.metaData = data;
          this.currentPage = data.pagination.currentPage;
        });


      }
    });
  }
  addEstado(tittle: string, form: string){

    this.srvModal.setFormModal({formulario: form, title: tittle, special: false});
    this.srvModal.openModal();


  }
  txtMensaje: string = '';
  txtTitulo: string = '';
  estado: string = '';
  cambiarEstado(id: number, nuevoEstado: string){
    if(nuevoEstado === 'ACTIVO'){
      this.estado = 'INACTIVO';
      this.txtMensaje = 'Al desactivar este estado, no podrá ser seleccionado en futuras incidencias';
      this.txtTitulo = '¿Está seguro de desactivar este estado?';
    }else if(nuevoEstado === 'INACTIVO'){
      this.estado = 'ACTIVO';
      this.txtMensaje = 'Al activar este estado, podrá ser seleccionado en futuras incidencias';
      this.txtTitulo = '¿Está seguro de activar este estado?';
    }
    Swal.fire({
      title: this.txtTitulo,
      text: this.txtMensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvEstados.cambiarEstadoEstado(id, this.estado)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if(data.status){
              Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.srvEstados.obtenerEstados({
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
    })

  }
  editarEstado(estado:any, tittle: string, form: string){
    this.buscando = false;
    this.filtrando = false;
    this.elementForm = {
      formulario: form,
      title: tittle,
      special: false,
    };

    this.srvEstados.setUpdataEstado(estado)
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }
  buscarEstado(search : string){
    this.searchText = search;
    this.buscando = true;
    if(search !== ''){
      Swal.fire({
        title: 'Buscando...',
        icon: 'question',
        timer: 900,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if(search === ''){
      this.srvEstados.obtenerEstados({
        page: 1,
        limit: 10,
      });
      this.verificarData();
    }else{
      this.srvEstados.buscarEstados({
        texto: search,
        page: 1,
      });
      this.verificarData();
    }
  }



  filtrarEstado(filtro: string){
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon:'success',
      timer:900,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    switch(filtro){
      case 'Ver estados activos':
        this.filtroActual = 'Ver estados activos';
        this.filtrando = true;
        this.srvEstados.filtrarEstados({
          filtro: 'ACTIVO',
          page:1
        });
        this.verificarData();
        break;
      case 'Ver estados inactivos':
        this.filtroActual = 'Ver estados inactivos';
        this.filtrando = true;
        this.srvEstados.filtrarEstados(
          {
            filtro:'INACTIVO',
            page:1
          }
        );
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.filtrando= true;
        this.srvEstados.obtenerEstados({
          page: 1,
          limit: 10,
        });
        this.verificarData();
        break;
    }



  }
  verificarData(){
    if(this.srvEstados.metaData.pagination.total === 0){

      this.isData = false;
    }else{
      this.isData = true;
    }
  }

  changePage(page: number){
    this.currentPage = page;

    //comprobar si se esta buscando o filtrando
    if(this.filtroActual === 'Ver estados activos'){
      this.srvEstados.filtrarEstados({
        filtro: 'ACTIVO',
        page: page

      });
    }
    if(this.filtroActual === 'Ver estados inactivos'){
      this.srvEstados.filtrarEstados({
        filtro: 'INACTIVO',
        page: page

      });
    }
    if(this.searchText !== ''){
      this.srvEstados.buscarEstado(this.searchText, page);
    }
    if(this.filtroActual === 'Ver todo' && this.searchText === ''){
      this.srvEstados.obtenerEstados({
        page: page,
        limit: 10,
      });
    }

  }

}
