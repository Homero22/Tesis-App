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

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  myform!: FormGroup;

  telefonoFormControl: FormControl;
  @ViewChild('telefonoInput') telefonoInput!: ElementRef | undefined;

  constructor(
    public UsuariosService: UsuariosService,
    public form: FormBuilder,
    public renderer: Renderer2
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
      didOpen: () => {
        Swal.showLoading(null);
      },
    });

    this.UsuariosService.getUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_usuarios) => {
          if (_usuarios.body) {
            this.isData = true;
            this.UsuariosService.dataUsuarios = _usuarios.body.map(
              (usuario) => ({ ...usuario, editando: false })
            );
            console.log(
              'Datos recibidos :->',
              this.UsuariosService.dataUsuarios
            );
            Swal.close();
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

  //editar usuario seleccionado
  guardarEdicion(usuario: any, telefono: string): void {
    // Inicializa el formulario con el valor actual del teléfono
    this.myform.controls['telefono'].setValue(usuario.str_usuario_telefono);
    console.log(
      'telefono ruben si funciono xdxdxd',
      this.myform.controls['telefono'].value
    );
    this.copiaTelefono = usuario.str_usuario_telefono = telefono;

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Que desea editar el usuario seleccionado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, editar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Usuario a editar', usuario);
        this.UsuariosService.editarUsuario(
          usuario.int_usuario_id,
          usuario.str_usuario_telefono
        )
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (_usuarioEditado) => {
              console.log('Usuario editado', _usuarioEditado);
              if (_usuarioEditado.status == true) {
                Swal.fire('Editado!', _usuarioEditado.message, 'success');
              } else {
                Swal.fire('Error!', _usuarioEditado.message, 'error');
              }
            },
            error: (error) => {
              Swal.fire('Error!', 'El usuario no ha sido editado.', 'error');
            },
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('cancelado');
        Swal.fire('Cancelado', 'El usuario no ha sido editado.', 'error');
      }
    });

    usuario.editando = false;
    this.myform.reset();
  }

  iniciarEdicion(usuario: any): void {
       // Enfocar manualmente el input al iniciar la edición
       if (this.telefonoInput) {
        this.renderer.selectRootElement(this.telefonoInput.nativeElement).focus();
      }
    // Establecer el modo de edición para la fila seleccionada
    usuario.editando = true;
    // Hacer una copia del teléfono para restaurar si es necesario
    this.copiaTelefono = usuario.str_usuario_telefono;
    this.myform.controls['telefono'].setValue(usuario.str_usuario_telefono);

  }
  cancelarEdicion(usuario: any): void {
       // Enfocar manualmente el input al iniciar la edición
       if (this.telefonoInput) {
        this.renderer.selectRootElement(this.telefonoInput.nativeElement).focus();
      }
    // Cancelar la edición y restablecer el formulario al estado original
    usuario.editando = false;
    this.myform.reset();

  }
}
