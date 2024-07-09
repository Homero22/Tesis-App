import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GraficosService } from 'src/app/core/services/incidencias/graficos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Incidencias Registradas', borderColor: 'rgba(75, 192, 192, 1)',  type: 'line'},
    { data: [], label: 'Incidencias Resueltas', borderColor: 'rgba(153, 102, 255, 1)',type: 'line'}
  ];

  public lineChartLabels: [] = [];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;

  constructor(private srvGraficos: GraficosService) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadChartData(): void {
    const anio = new Date().getFullYear();
    this.srvGraficos.getGraficos(anio)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.status) {
            Swal.close();
            this.lineChartLabels = data.body.labels;
            this.lineChartData[0].data = data.body.datasets[0].data;
            this.lineChartData[1].data = data.body.datasets[1].data;
            console.log('Datos del servidor:', this.lineChartData[1].data);
          } else {
            console.error('Error en los datos del servidor:', data);
          }
        },
        error: (error) => {
          console.error('Error al obtener datos:', error);
        }
      });
    }


}

