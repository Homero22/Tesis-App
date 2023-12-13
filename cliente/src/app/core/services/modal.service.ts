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
    throw new Error('Method not implemented.');
  }
  private FormModal$ = new BehaviorSubject<DataFormModal>(initModal);



  get selectFormModal$(): Observable<DataFormModal> {
    return this.FormModal$.asObservable();
  }

  setFormModal(data: DataFormModal) {
    this.FormModal$.next(data);
  }


  openModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;
    if (modalGeneral) {
      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';

      setTimeout(() => {
        if (modalGeneral) {
          modalGeneral.style.opacity = 1;
        }
      });
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
