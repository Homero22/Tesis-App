import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UsuariosService } from '../../../../core/services/Usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { DataMetadata } from 'src/app/core/models/metadata';
import { UsuariosModelBody } from 'src/app/core/models/usuarios/usuariosModel';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsuarioRolService } from 'src/app/core/services/Usuarios/usuarioRol.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  request = false;
  myform!: FormGroup;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  currentPage: number = 1;
  metadata!: DataMetadata;
  total!: number;

  telefonoFormControl: FormControl;
  @ViewChild('telefonoInput') telefonoInput!: ElementRef | undefined;

  constructor(
    public UsuariosService: UsuariosService,
    public UsuarioRolService: UsuarioRolService,
    public form: FormBuilder,
    public renderer: Renderer2,
    public srvModal: ModalService,
    public srvRoles: RolesService
  ) {
    this.myform = this.form.group({
      telefono: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d{9}$/)],
      ],
    });

    this.telefonoFormControl = new FormControl();
  }
  private destroy$ = new Subject<any>();

  status!: boolean;
  isData: boolean = false;
  isLoading: boolean = true;
  buscando: boolean = false ;
  filtrando: boolean = false;
  copiaTelefono: string = '';
  searchText: string = '';
  placeholder:string = 'Buscar usuario';
  actualizarPaginacion: number = 0;
  usuarios : UsuariosModelBody []=[];
  loading : boolean = false;
  filtros: any[] = [
  "Ver usuarios activos",
  "Ver usuarios inactivos",
  ]
  filtroActual: string = 'Ver todo';




  ngOnInit(): void {
    this.UsuariosService.setVerPerfil(false);
    this.request = true;
    setTimeout(()=>{
        this.isLoading = false;
      },400
    )
    let params = {
      page: 1,
      limit: 10,
    };
    this.srvRoles.obtenerTodosRoles();

    this.UsuariosService.obtenerUsuarios({
      page:1,
      limit:10
    })

    this.UsuariosService.selectUsuarios$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res)=>{
          this.usuarios = res;
          this.request = false;
          this.verificarData();
        }
      )

    this.UsuariosService.selectMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res)=>{
        this.metadata = res;
        this.currentPage =res.pagination.currentPage;
      }
    )
  }

  perfiles(usuario: UsuariosModelBody){
    this.UsuariosService.setUsuario(usuario);
    this.UsuarioRolService.obtenerUsuarioRoles(usuario.int_usuario_id)
    this.UsuariosService.setVerPerfil(true);
  }


  buscarUsuario(search:string) {
    this.searchText = search;
    if (search != '') {
      Swal.fire({
        title: 'Buscando...',
        icon:'question',
        timer:500,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if(search===''){
      this.buscando=true;
      this.UsuariosService.obtenerUsuarios({
        page:1,
        limit:10
      })
      this.verificarData();
    }else{
      this.UsuariosService.buscarUsuariosGeneral(search,1)
      this.verificarData();
    }

  }
  verificarData(){

    if(this.UsuariosService.metaData.pagination.total === 0){
      console.log(this.UsuariosService.metaData.pagination.total)
      this.isData = false;
    }else{
      this.isData = true;
    }
  }

  filtrarUsuario( filtro:any){
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
      case "Ver usuarios activos":
        this.filtroActual = "Ver usuarios activos";
        this.filtrando = true;
        this.UsuariosService.filtrarUsuariosGeneral("ACTIVO",1)
        this.verificarData();
        break;
      case "Ver usuarios inactivos":
        this.filtroActual = "Ver usuarios inactivos";
        this.filtrando = true;
        this.UsuariosService.filtrarUsuariosGeneral("INACTIVO",1)
        this.verificarData();
        break;
      case "Ver todo":
        this.filtroActual = "Ver todo";
        this.UsuariosService.obtenerUsuarios({
          page:1,
          limit:10
        })
        this.verificarData();
        break;
    }
  }

  editarUsuario(user: UsuariosModelBody, title: string, form: string) {
    this.buscando = false;
    this.filtrando = false;
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.UsuariosService.setUpdateUsuario(user);
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  txtMensaje: string = '';
  txtTitulo: string = '';
  cambiarEstado(id: number, nuevoEstado: string) {
    if (nuevoEstado === 'ACTIVO') {
      this.txtMensaje =
        'Al deshabilitar un Usuario, este no podrá acceder al sistema. Este cambio puede ser revertido en cualquier momento';
      this.txtTitulo = '¿Está seguro que desea desactivar este Usuario?';
    } else if (nuevoEstado === 'INACTIVO') {
      this.txtMensaje =
        'Con este cambio el usuario podrá acceder al sistema nuevamente';
      this.txtTitulo = '¿Está seguro que desea activar este Usuario?';
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
          Swal.fire({
            title: 'Espere',
            text: 'Cambiando Estado',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          setTimeout(() => {
        this.UsuariosService.cambiarEstadoUsuario(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: any) => {
              if (res.status) {
                Swal.fire({
                  title: 'Usuario Modificado',
                  text: 'Usuario Modificado Correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then(() => {
                    this.UsuariosService.obtenerUsuarios({
                      page:1,
                      limit:10
                    })
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Error al modificar el usuario',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                });
              }
            },
            error: (err: any) => {
              console.log('err: ', err);
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'Error al modificar el usuario: ' + err,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            },
          });
        }, 800);
      } else if (result.isDenied) {
        Swal.fire('Cambios no realizados', '', 'info');
      }
    });
  }


  changePage(page: number) {
    this.request = true;
    this.currentPage = page;
    //comprobar si se esta filtrando para cambiar la pagina
    if(this.filtroActual === 'Ver usuarios activos'){
      this.UsuariosService.filtrarUsuariosGeneral('ACTIVO',page)
    }
    if(this.filtroActual === 'Ver usuarios inactivos'){
      this.UsuariosService.filtrarUsuariosGeneral('INACTIVO',page)
    }
    if(this.searchText !== ''){
      this.UsuariosService.buscarUsuariosGeneral(this.searchText,page)
    }
    if(this.filtroActual === 'Ver todo' && this.searchText === ''){
      this.UsuariosService.obtenerUsuarios({
        page: page,
        limit: 10,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
