import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MenusService } from 'src/app/core/services/menus.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent implements OnInit {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  typeViewMenu!: boolean;
  menuPadre: {nombre: string, id: number} = {nombre: '', id: 0};
  _idMenu: number = 0;
  allMenus: any[] = [];
  constructor(
    public srvMenus: MenusService,
    public srvModal: ModalService,
    public fb: FormBuilder,
  ) {
    this.typeViewMenu = false;
    this.myForm = this.fb.group({
      int_menu_padre_id: [0],
      str_menu_nombre: ['',[Validators.required]],
      str_menu_descripcion: [''],
      str_menu_path: ['',[Validators.required]],
      str_menu_icono: [''],
    });
   }
   isLoading: boolean = true;

  ngOnInit(


  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 400);
    Swal.fire({
      title: 'Cargando...',
      timer: 800,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }


  agregarMenu(){
    let intMenuPadre = this.myForm.get('int_menu_padre_id')?.value;
    intMenuPadre= parseInt(intMenuPadre);
    this.myForm.patchValue({
      int_menu_padre_id: intMenuPadre
    });
    Swal.fire({
      title: '¿Estás seguro que desea agregar este menú?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvMenus.crearMenu(this.myForm.value)
        .subscribe({
          next:(res:any)=>{
            if(res.status == true){

              Swal.fire({
                title: 'Menú agregado',
                icon: 'success',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Aceptar`,
              })
            }else{

              Swal.fire({
                title: 'Error al agregar el menú',
                icon: 'error',
                text: res.message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Aceptar`,
              })
            }

          },
          error:(err:any)=>{
            console.log(err);
          },
          complete:()=>{
            this.myForm.reset();
            this.srvModal.closeModal();
            this.srvMenus.obtenerMenus({
              page: 1,
              limit: 10,
            });
          }

        });
      }
    })

  }

  onIconSelect(event: any) {
    this.myForm.patchValue({
      str_menu_icono: event.target.value
    });
  }
}
