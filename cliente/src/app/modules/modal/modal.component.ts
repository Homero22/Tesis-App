import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  private destroy$ = new Subject<any>();
  public tipoFormulario: string = '';
  public titleModal: string = '';
  triggerModal?: boolean;
  constructor(
    public srvModal: ModalService
  ) { }

  ngOnInit():void {
    console.log("ngOnInit modal");
    this.srvModal.selectFormModal$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(data)=>{
        console.log("formulario en modal.comp",data);
        this.tipoFormulario = data.formulario;
        this.titleModal = data.title;
        this.triggerModal = data.special;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
    document.addEventListener('keydown', this.handleKeyDown.bind(this)); //para cerrar el modal
  }
  handleKeyDown(event: KeyboardEvent) {
    // Si se presiona la tecla "Esc"
    if (event.key === 'Escape') {
      this.cerrarModal();
    }
  }
  cerrarModal() {
    localStorage.clear();
    this.srvModal.closeModal();
    this.tipoFormulario = 'clear';
    this.titleModal = '';
    this.srvModal.openModal();
    this.srvModal.closeModal();
  }

}
