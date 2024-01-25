import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenusModelBody } from 'src/app/core/models/menus';
import { DataMetadata } from 'src/app/core/models/metadata';
import { MenusService } from 'src/app/core/services/menus.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  isData: boolean = false;
  request = false;
  isLoading: boolean = true;
  currentPage: number = 1;
  mostrarMenuPrincipal= true;
  private destroy$ = new Subject<any>();
  constructor(
    public srvMenus: MenusService,
    public srvModal: ModalService
  ) {}
  status!: boolean;
  buscando: boolean = false;
  filtrando: boolean = false;
  copiaTelefono: string = '';
  searchText: string = '';
  placeholder: string = 'Buscar menú';
  actualizarPaginacion: number = 0;
  loading: boolean = false;
  filtros: any[] = ['Ver menús activos', 'Ver menús inactivos'];
  metadata!: DataMetadata;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  filtroActual: string = 'Ver todo';

  ngOnInit() {
    this.srvMenus.obtenerAllMenus();
    this.request = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 400);
    let params = {
      page: 1,
      limit: 10,
    };

    this.srvMenus.obtenerMenus({
      page: 1,
      limit: 10,
    });

    this.srvMenus.selectMenus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.srvMenus.menus = data;
        this.verificarData();
      });

    this.srvMenus.selectMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
        this.srvMenus.metaData = data;
        this.currentPage = data.pagination.currentPage;
      });

    this.srvMenus.selectMenuSeleccionado$
    .subscribe(menu =>{
      this.srvMenus.menuSeleccionado = menu;
    });

  }

  editarMenu(menu: MenusModelBody, title: string, form: string) {
    this.buscando = false;
    this.filtrando = false;
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvMenus.setUpdateMenu(menu);
    this.srvMenus.obtenerMenuPadre(menu.int_menu_padre_id);
    this.srvModal.setFormModal(this.elementForm);
    this.srvMenus.obtenerAllMenus();
    this.srvModal.openModal();
  }

  verificarData() {
    if (this.srvMenus.metaData.pagination.total === 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }
  }

  txtMensaje: string = '';
  txtTitulo: string = '';

  cambiarEstado(id: number, nuevoEstado: string) {
    let txtMensaje = '';
    let txtTitulo = '';

    if (nuevoEstado === 'ACTIVO') {
      txtMensaje =
        'Al deshabilitar un menú, no se podrá elegir este menú para nuevas opciones';
      txtTitulo = '¿Está seguro que desea desactivar este Menú?';
    } else if (nuevoEstado === 'INACTIVO') {
      txtMensaje =
        'Con este cambio se podrá asignar este menú a las opciones del sistema';
      txtTitulo = '¿Está seguro que desea activar este menú?';
    }

    Swal.fire({
      title: txtTitulo,
      text: txtMensaje,
      showDenyButton: true,
      confirmButtonText: `Si, cambiar`,
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.buscando = false;
        this.filtrando = false;
        this.srvMenus.cambiarEstadoMenu(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              if (data.status) {
                Swal.fire({
                  icon: 'success',
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.srvMenus.obtenerMenus({
                  page: 1,
                  limit: 10,
                });
                this.srvMenus.obtenerMenusAndSubmenus();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            }
          });
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;

    if (this.filtroActual === 'Ver menús activos') {
      this.srvMenus.filtrarMenusGeneral('ACTIVO', page);
    }
    if (this.filtroActual === 'Ver menús inactivos') {
      this.srvMenus.filtrarMenusGeneral('INACTIVO', page);
    }
    if (this.searchText !== '') {
      this.srvMenus.buscarMenusGeneral(this.searchText, page);
    }
    if (this.filtroActual === 'Ver todo' && this.searchText === '') {
      this.srvMenus.obtenerMenus({
        page: page,
        limit: 10,
      });
    }
  }

  buscarMenu(search: string) {
    this.searchText = search;
    this.buscando = true;
    if (search !== '') {
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
      this.srvMenus.obtenerMenus({
        page: 1,
        limit: 10,
      });
      this.verificarData();
    } else {
      this.srvMenus.buscarMenusGeneral(search, 1);
      this.verificarData();
    }
  }

  filtrarMenu(filtro: any) {
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
      case 'Ver menús activos':
        this.filtroActual = 'Ver menús activos';
        this.filtrando = true;
        this.srvMenus.filtrarMenusGeneral('ACTIVO', 1);
        this.verificarData();
        break;
      case 'Ver menús inactivos':
        this.filtroActual = 'Ver menús inactivos';
        this.filtrando = true;
        this.srvMenus.filtrarMenusGeneral('INACTIVO', 1);
        this.verificarData();
        break;
      case 'Ver todo':
        this.filtroActual = 'Ver todo';
        this.filtrando = true;
        this.srvMenus.obtenerMenus({
          page: 1,
          limit: 10,
        });
        this.verificarData();
        break;
    }
  }

  menuSeleccionado(menu: MenusModelBody) {
    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      timer: 900,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.srvMenus.setMenuSeleccionado(menu);
    this.srvMenus.obtenerSubmenus(menu.int_menu_id);
    this.srvMenus.obtenerAllMenus();
    this.srvMenus.agregarMenuPadre =[menu]

    this.mostrarMenuPrincipal = false;
    this.verificarData();

  }
  regresar(){
    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      timer: 900,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.mostrarMenuPrincipal = true;
    this.srvMenus.obtenerMenus({
      page: 1,
      limit: 10,
    });
  }


}
