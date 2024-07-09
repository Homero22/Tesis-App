import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { TicketService } from 'src/app/core/services/incidencias/ticket.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataReporteTickets } from 'src/app/core/models/incidencias/dataReporteTickets';
import { Data } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit, AfterViewInit {
  public pdfSrc: any;

  private destroy$ = new Subject<any>();
  constructor(
    public srvTickets: TicketService,
    private fb: FormBuilder,
  ) {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
      selectedOption: new FormControl<string | null>('', Validators.required)
    });

    // Subscribe to value changes to dynamically update button state
    this.range.valueChanges.subscribe(() => {
      this.verificarDatosReporte();
    });
   }
  isData = true;
  metadata!: DataMetadata;
  currentPage: number = 1;
  total!: number;
  selectedOption: string = '';
  isTitle = false;
  selectedValue!: string;
  estado!: string;

  dataAll: DataReporteTickets[] = [];

  ngOnInit() {
    this.actualizarTabla();

  }

  obtenerReporte() {
      const { start, end, selectedOption } = this.range.value;
      Swal.fire({
        title: 'Cargando...',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.srvTickets.obtenerTicketsByDate({
        fechainicio: start,
        fechafin: end,
        estado: selectedOption
      });
      this.actualizarTabla();
  }

  verData(ticket:any, titulo:string, modal:string) {
    this.isData = true;

  }

  verificarDatosReporte() {
    if (this.range.value.start && this.range.value.end && this.range.value.selectedOption) {
      return true;
    }else{
      return false;
    }
  }

  verificarDatosPdf(){
    if (this.range.value.start && this.range.value.end && this.range.value.selectedOption && this.dataSource.data.length > 0) {
      return true;
    }else{
      return false;
    }
  }

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    selectedOption: new FormControl<string>('')
  });

  //table angular material
  dataSource! : MatTableDataSource<DataReporteTickets>
  displayedColumns: string[] = ['#', 'Incidencia', 'Responsable', 'Estado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actualizarTabla() {
    this.srvTickets.selectTicketsReportes$.subscribe((data) => {
      console.log(data);
      this.dataAll = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataAll = data;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  generarPDF() {
    this.abrirPdf = true;
    const pdfDefinition: any = {
      content: [
        { text: 'Reporte de Tickets', style: 'header' },
        { text: new Date().toLocaleString(), alignment: 'right' },
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: [
              ['Fecha Creación', 'Estado', 'Responsable','Vulnerabilidad'],
              ...this.dataAll.map((p) => [p.dt_fecha_creacion, p.str_estado_nombre, p.ticket_usuario, p.str_vulnerabilidades_nombre])
            ]
          }
        }
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(pdfDefinition);
    pdfDocGenerator.getBase64((data: any) => {
      this.pdfSrc = data;
      let viewpdf = document.getElementById('ver-pdf-reporte');
          if (viewpdf) {
            viewpdf.innerHTML =
              ' <iframe src="' +
              'data:application/pdf;base64,' +
              this.pdfSrc +
              '" type="application/pdf" width="100%" height="600" />';
          }
    });



  }

  abrirPdf : boolean = false;

  cerrarPdf(){
    this.abrirPdf = false;
  }





}
