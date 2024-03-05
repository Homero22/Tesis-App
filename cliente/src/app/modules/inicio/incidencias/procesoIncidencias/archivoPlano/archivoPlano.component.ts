import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Papa } from 'ngx-papaparse';
import { SafeCall } from '@angular/compiler';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-archivoPlano',
  templateUrl: './archivoPlano.component.html',
  styleUrls: ['./archivoPlano.component.css'],
})
export class ArchivoPlanoComponent implements OnInit {
  myForm!: FormGroup;
  mostrarTable: boolean = true;
  data: any[] = [];
  dataLength: number = 0;
  columns: string[] = [];
  tablaInfo: boolean = false;
  fil!: File;
  filName: string | null = null;
  fileLoaded: boolean = false;

  private destroy$ = new Subject<any>();

  constructor(
    public fb: FormBuilder,
    private papa: Papa,
    public srvIncidencias: IncidenciasService
  ) {
    this.myForm = this.fb.group({
      archivo: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.myForm.reset();
  }

  async selectFile(event: any) {
    this.mostrarTable = true;

    this.fil = event.target.files[0];
    this.filName = this.fil.name;

    if (this.fil) {
      Swal.fire({
        title: 'Cargando Archivo',
        allowOutsideClick: false, // no se puede cerrar con click fuera
        allowEscapeKey: false, // no se puede cerrar con escape
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const reader = new FileReader();
      reader.readAsText(this.fil);

      reader.onload = () => {
        this.parseCsvFile(reader.result as string);
        Swal.close();
      };
    }
  }

  parseCsvFile(fileContent: string) {
    this.fileLoaded = true;
    this.papa.parse(fileContent, {
      header: true,
      complete: (result) => {
        this.data = result.data;
        this.dataLength = this.data.length - 1;
        this.columns = result.meta.fields || [];
      },
    });
  }
  comprobarArchivo() {
    console.log('comprobando archivo');
    //verificar que el archivo tenga las columnas necesarias
    let columns = [
      'Plugin ID',
      'CVE',
      'CVSS v2.0 Base Score',
      'Risk',
      'Host',
      'Protocol',
      'Port',
      'Name',
      'Synopsis',
      'Description',
      'Solution',
      'See Also',
      'Plugin Output',
      'STIG Severity',
      'CVSS v3.0 Base Score',
      'CVSS v2.0 Temporal Score',
      'CVSS v3.0 Temporal Score',
      'Risk Factor',
      'BID',
      'XREF',
      'MSKB',
      'Plugin Publication Date',
      'Plugin Modification Date',
      'Metasploit',
      'Core Impact',
      'CANVAS',
    ];

    let columnsOk = true;


    //si el archivo no tiene todas las columnas requeridas se muestra un mensaje de error
    for (let i = 0; i < columns.length; i++) {
      if (!this.columns.includes(columns[i])) {
        columnsOk = false;
        break;
      }
    }

    if (columnsOk && this.data.length > 0) {
      this.tablaInfo = true;
    } else {
      this.tablaInfo = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El archivo no contiene las columnas necesarias',
      });
    }
    return columnsOk;
  }

  importData() {

    let archivoIsValid = this.comprobarArchivo();
    if(!archivoIsValid){
      return;
    }


    const formData = new FormData();
    formData.append('file', this.fil, this.fil.name);

    Swal.fire({
      title: 'Importando Datos de Usuarios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.srvIncidencias
      .postFileData(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status) {
            Swal.close();
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Datos Cargados Exitosamente',
              text: res.message,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/incidencias/vulnerabilidades';
              }
            });
            //redirigir a la pagina de incidencias  /incidencias/vulnerabilidades

            //window.location.href = '/incidencias/vulnerabilidades';
            //window.location.reload();
          } else {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            });
          }
        },
        error: (err) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
