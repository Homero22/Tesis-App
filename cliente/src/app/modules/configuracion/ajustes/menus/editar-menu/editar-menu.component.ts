import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MenusService } from 'src/app/core/services/menus.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-menu',
  templateUrl: './editar-menu.component.html',
  styleUrls: ['./editar-menu.component.css']
})
export class EditarMenuComponent implements OnInit {
  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  menuPadre: {nombre: string, id: number} = {nombre: '', id: 0};
  typeViewMenu!: boolean;
  nombreMenuPadre!: string;
  iconoAux!: string;
  isLoading: boolean = false;
  constructor(
    public srvMenus : MenusService,
    public srvModal: ModalService,
    public fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({

      str_menu_icono:[
      null,
    ],
    int_menu_padre:[
      null,
    ],
    str_menu_nombre:[
      null,
      [Validators.required],
    ],
    str_menu_descripcion:[
      null,
      [Validators.required],
    ],
    str_menu_path:[
      null,
      [Validators.required],
    ]
    });
   }

  ngOnInit() {
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
    this.srvMenus.selectUpdateMenu$
    .subscribe({
      next:(res:any)=>{
        this.myForm.controls['str_menu_nombre'].setValue(res.str_menu_nombre);
        this.myForm.controls['str_menu_descripcion'].setValue(res.str_menu_descripcion);
        this.myForm.controls['str_menu_path'].setValue(res.str_menu_path);
        this.myForm.controls['str_menu_icono'].setValue(res.str_menu_icono);
        this.myForm.controls['int_menu_padre'].setValue(res.int_menu_padre);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
    this.iconoAux = this.myForm.controls['str_menu_icono'].value;
    this.obtenerMenuPadre();

  }
  onIconSelect( event: any ){


  }
  obtenerMenuPadre(){
    this.srvMenus.selectNombreMenuPadre$
    .subscribe({
      next:(res:any)=>{
        this.nombreMenuPadre = res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  modifyMenu(){

  }


}
