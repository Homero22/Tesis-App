import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-solucion-ticket',
  templateUrl: './add-solucion-ticket.component.html',
  styleUrls: ['./add-solucion-ticket.component.css']
})
export class AddSolucionTicketComponent implements OnInit {
  editarTicket! :any;
  myForm!: FormGroup;
  solucion: string = '';
  private destroy$ = new Subject<any>();
  rol: any='';

  fechaActual = new Date();
  constructor(
    private srvTicket: TicketService,
    private srvModal: ModalService,
    public fb: FormBuilder
  ) {

   }

  ngOnInit() {
    this.srvTicket.selectAddSolucionTicket$.subscribe({
      next:(res:any)=>{

        this.editarTicket = res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });

    this.srvTicket.selectRol$.subscribe({
      next:(res:any)=>{
        this.rol = res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });

    this.srvTicket.selectSolucionTicketUsuario$.subscribe({
      next:(res:any)=>{

        if(res.vacio){

        }else{

          this.solucion = res.txt_ticket_usuario_solucion
          this.myForm = this.fb.group({
            solucion: [this.solucion, Validators.required]
          });
        }

      },
      error:(err:any)=>{
        console.log(err);
      }
    });


  }
  comprobarSolucion(){
    //retorno true o false si
  }

  addSolucionTicket(){
    let data = {
      int_ticket_id: this.editarTicket.int_ticket_id,
      int_usuario_id: this.editarTicket.idUsuario,
      txt_ticket_usuario_solucion: this.solucion,
      dt_fecha_actualizacion: this.fechaActual,
      int_ticket_usuario_id: this.editarTicket.int_ticket_usuario_id
    }

    Swal.fire({
      title: '¿Estás seguro de agregar la solución?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      this.comprobarSolucion();
      if (result.isConfirmed) {
        this.srvTicket.addSolucionTicket(data)
        .subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Solución agregada con éxito',
              icon: 'success',
              text: data.message
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error al agregar solución',
              icon: 'error',
              text: err.error.message
            });
          },
          complete: () => {
            this.srvModal.closeModal();
            this.srvTicket.obtenerTicketsUsuario({
              page: 1,
              limit: 10,
              rol: this.rol
            });

          }
        })
      }
    });




  }

}
