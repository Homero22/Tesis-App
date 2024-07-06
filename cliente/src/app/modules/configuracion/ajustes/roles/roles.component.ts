import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { RolesModelBody } from 'src/app/core/models/roles';
import { ModalService } from 'src/app/core/services/modal.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  isData: boolean = false;
  request = false;
  isLoading: boolean = true;
  currentPage: number = 1;
  private destroy$ = new Subject<any>();
  constructor(
    public srvRoles: RolesService,
    public srvModal: ModalService
    ) {}
  status!: boolean;
  buscando: boolean = false;
  filtrando: boolean = false;
  copiaTelefono: string = '';
  searchText: string = '';
  placeholder: string = 'Buscar rol';
  actualizarPaginacion: number = 0;
  loading: boolean = false;
  filtros: any[] = ['Ver roles activos', 'Ver roles inactivos'];
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
    let params = {
      page: 1,
      limit: 10,
    };

    this.srvRoles.obtenerRoles({
      page: 1,
      limit: 10,
    });

    this.srvRoles.selectRoles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.srvRoles.roles = data;
        this.verificarData();

      });

    this.srvRoles.selectMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
        this.srvRoles.metaData = data;
        this.currentPage = data.pagination.currentPage;
      });
  }

  editarRol(rol:RolesModelBody, title: string, form: string) {
    this.buscando = false;
    this.filtrando = false;
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvRoles.setUpdataRol(rol)
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  verificarData(){
    if(this.srvRoles.metaData.pagination.total === 0){

      this.isData = false;
    }else{
      this.isData = true;
    }
  }



  txtMensaje: string = '';
  txtTitulo: string = '';

  cambiarEstado(id: number, nuevoEstado: string) {
    if (nuevoEstado === 'ACTIVO') {
      this.txtMensaje =
        'Al deshabilitar un rol, no se podrá elegir este rol para nuevos usuarios';
      this.txtTitulo = '¿Está seguro que desea desactivar este Rol?';
    } else if (nuevoEstado === 'INACTIVO') {
      this.txtMensaje =
        'Con este cambio se podrá asignar este rol a los usuarios del sistema';
      this.txtTitulo = '¿Está seguro que desea activar este rol?';
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
        this.srvRoles.cambiarEstadoRol(id)
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
              this.srvRoles.obtenerRoles({
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
  changePage(page: number) {
    this.currentPage = page;
    //comprobar si se esta filtrando para cambiar la pagina
    if(this.filtroActual === 'Ver roles activos'){
      this.srvRoles.filtrarRolesGeneral('ACTIVO',page)
    }
    if(this.filtroActual === 'Ver roles inactivos'){
      this.srvRoles.filtrarRolesGeneral('INACTIVO',page)
    }
    if(this.searchText !== ''){
      this.srvRoles.buscarRolesGeneral(this.searchText,page)
    }
    if(this.filtroActual === 'Ver todo' && this.searchText === ''){
      this.srvRoles.obtenerRoles({
        page: page,
        limit: 10,
      });
    }
  }


  buscarRol(search: string) {
    this.searchText = search;
    this.buscando = true;
    if(search != ''){
      Swal.fire({
        title: 'Buscando...',
        icon:'question',
        timer:900,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if(search === ''){
      this.srvRoles.obtenerRoles({
        page: 1,
        limit: 10,
      });
      this.verificarData();
    }else{
      this.srvRoles.buscarRolesGeneral(search,1)
      this.verificarData();
    }
  }


  filtrarRol(filtro: any) {
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon:'success',
      timer:900,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    switch (filtro) {
      case 'Ver roles activos':
        this.filtroActual = 'Ver roles activos';
        this.filtrando = true;
        this.srvRoles.filtrarRolesGeneral('ACTIVO',1)
        this.verificarData();
        break;
      case 'Ver roles inactivos':
        this.filtroActual = 'Ver roles inactivos';
        this.filtrando = true;
        this.srvRoles.filtrarRolesGeneral('INACTIVO',1)
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.filtrando = true;
        this.srvRoles.obtenerRoles({
          page: 1,
          limit: 10,
        });
        this.verificarData();
        break;
      }
  }
}
