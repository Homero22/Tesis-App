import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataFormModal } from '../models/modal';


const initModal: DataFormModal = {
  formulario: '',
  title: '',
  special:true
};

const idUsuario: number = 0;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called ');
    throw new Error('Method not implemented.');
  }
  private FormModal$ = new BehaviorSubject<DataFormModal>(initModal);

  private idUsuario$ = new BehaviorSubject<number>(idUsuario);


  get selectIdUsuario$() {
    return this.idUsuario$.asObservable();
  }
  setIdUsuario(id: number) {
    this.idUsuario$.next(id);
    console.log("paso 3 . idUsuario-value",this.idUsuario$.value);
  }

  get selectFormModal$(): Observable<DataFormModal> {
    return this.FormModal$.asObservable();
  }

  setFormModal(data: DataFormModal) {
    console.log("paso 2 modal")
    this.FormModal$.next(data);
    console.log("formmodal-value",this.FormModal$.value);
  }


  openModal() {
    console.log('openModal');
    let modalGeneral = document.getElementById('modalGeneral') as any;
    if (modalGeneral) {
      console.log('openModal de service');
      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';

      setTimeout(() => {
        if (modalGeneral) {
          modalGeneral.style.opacity = 1;
        }
      });
    }else{
      console.log('no existe modalGeneral');
    }
  }

  closeModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;
    if(modalGeneral){
      modalGeneral.style.display = 'none';
      modalGeneral.classList.remove('show');
      modalGeneral.style.opacity = 1;
    }
  }
}
