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

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  myform!: FormGroup;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  telefonoFormControl: FormControl;
  @ViewChild('telefonoInput') telefonoInput!: ElementRef | undefined;

  constructor(
    public UsuariosService: UsuariosService,
    public form: FormBuilder,
    public renderer: Renderer2,
    public srvModal: ModalService
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
  editando: boolean = false;
  copiaTelefono: string = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, 1000);
    this.getUsuarios();
  }

  //Obtener usuarios
  getUsuarios() {
    Swal.fire({
      title: 'Cargando...',
      timer:1000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.UsuariosService.getUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_usuarios) => {
          if (_usuarios.body) {
            this.isData = true;
            this.UsuariosService.dataUsuarios = _usuarios.body;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al cargar los usuarios',
              text: _usuarios.message,
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar los usuarios',
            text: error.error.message,
          });
        },
      });
  }

  editarUsuario(idUser: number, title: string, form: string) {
    console.log('paso 1 abrir modal');
    this.elementForm = {
      formulario: form,
      title: title,
      special: false,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setIdUsuario(idUser);
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
                  this.getUsuarios();
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
}
