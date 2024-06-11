import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ticket',
  templateUrl: './editar-ticket.component.html',
  styleUrls: ['./editar-ticket.component.css']
})
export class EditarTicketComponent implements OnInit {
  editarTicket! :any;
  myForm!: FormGroup;
  private destroy$ = new Subject<any>();

  constructor(private srvTicket: TicketService,
    public fb: FormBuilder,
    public srvModal: ModalService,

  ) {
    this.myForm = this.fb.group({

      observacion:[
          null,
          [Validators.required],
        ],
      servicio:[
          null,
          [Validators.required],
        ],
      estado:[  null,
          [Validators.required],
        ],
      incidencia_nombre:[
          null,
          [Validators.required],
        ],
      usuario:[
          null,
          [Validators.required],
        ],
    });
   }


  ngOnInit() {
    this.srvTicket.selectEditarTicket$.subscribe({
      next:(res:any)=>{
        this.editarTicket = res;
        this.myForm.controls['observacion'].setValue(this.editarTicket.str_ticket_observacion);
        this.myForm.controls['servicio'].setValue(this.editarTicket.str_servicio_nombre);
        this.myForm.controls['estado'].setValue(this.editarTicket.str_estado_nombre);
        this.myForm.controls['incidencia_nombre'].setValue(this.editarTicket.str_vulnerabilidades_nombre);
        this.myForm.controls['usuario'].setValue(this.editarTicket.ticket_usuario);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
    this.myForm.controls['incidencia_nombre'].disable();
    this.myForm.controls['usuario'].disable();
    this.myForm.controls['servicio'].disable();
    this.myForm.controls['estado'].disable();

  }
  actualizarTicket(){
    Swal.fire({
      title: '¿Estás seguro de actualizar este ticket?',
      showDenyButton: true,
      confirmButtonText: `Actualizar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Actualizando ticket',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });


        this.srvTicket.updateTicket(this.editarTicket.int_ticket_id,this.myForm.value.observacion)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(res:any)=>{
            if(res.status){
              Swal.fire({
                title: 'Ticket actualizado',
                icon: 'success',
                showDenyButton: false,
                confirmButtonText: 'Aceptar',
              });
            }else{
              Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          },
          error:(err:any)=>{
            Swal.fire({
              title: 'Error',
              text: 'Error al actualizar el ticket',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
          complete:()=>{
            this.srvModal.closeModal();
            this.myForm.reset();

            this.srvTicket.obtenerTickets({
              page:1,
              limit:10
            });
          }
        });

      }
    })
  }

}
