import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { IncidenciasModelBody } from 'src/app/core/models/incidencias/incidenciasModel';
import { DataMetadata } from 'src/app/core/models/metadata';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { ModalInfoIncidenciaComponent } from './components/modal-info-incidencia/modal-info-incidencia.component';

@Component({
  selector: 'app-vulnerabilidades',
  templateUrl: './vulnerabilidades.component.html',
  styleUrls: ['./vulnerabilidades.component.css']
})
export class VulnerabilidadesComponent implements OnInit {

  constructor(public srvIncidencias: IncidenciasService,public dialog: MatDialog,
    public srvModal : ModalService
    ) { }

  ngOnInit() {
    this.request = true;
    setTimeout(()=>{
      this.isLoading = false;
    },400
  )
    this.srvIncidencias.obtenerIncidencias({
      page:1,
      limit:10
    })

    this.srvIncidencias.selectMetadata$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.metadata = res;
      this.currentPage =res.pagination.currentPage;
      this.verificarData();
    }
  )
  }

  private destroy$ = new Subject<any>();
  request = false;
  myform!: FormGroup;
  elementForm: {
    formulario: string;
    title: string;
    special: boolean;
  } = { formulario: '', title: '', special: true };

  currentPage: number = 1;
  metadata!: DataMetadata;
  total!: number;
  status!: boolean;
  isData: boolean = false;
  isLoading: boolean = true;
  buscando: boolean = false ;
  filtrando: boolean = false;
  copiaTelefono: string = '';
  searchText: string = '';
  placeholder:string = 'Buscar incidencia';
  actualizarPaginacion: number = 0;
  //usuarios : UsuariosModelBody []=[];
  loading : boolean = false;
  filtros: any[] = [
  "Protocolo TCP",
  "Ver  inactivos",
  "Risk Factor Medium",
  "Risk Factor High",
  "Risk Factor Low",
  "Risk Factor Critical",
  ]
  filtroActual: string = 'Ver todo';


  buscarIncidencia(search:string) {
    this.searchText = search;
    if (search != '') {
      Swal.fire({
        title: 'Buscando...',
        icon:'question',
        timer:500,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if(search===''){
      this.buscando=true;
      this.srvIncidencias.obtenerIncidencias({
        page:1,
        limit:10
      })
      this.verificarData();
    }else{
      this.srvIncidencias.buscarIncidenciasGeneral(search,1)
      this.verificarData();
    }

  }


  verificarData(){

    if(this.srvIncidencias.metaData.pagination.total === 0){
      this.isData = false;
    }else{
      this.isData = true;
    }
  }

  crearTicket(incidencia: IncidenciasModelBody, title: string, form: string){
    this.srvIncidencias.setVerIncidencia(incidencia);
    this.elementForm = {
      formulario: form,
      title: title,
      special: true,
    };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();

  }


  verData(incidencia: IncidenciasModelBody,title: string, form: string){
    // this.srvIncidencias.setVerIncidencia(incidencia);
    // this.elementForm = {
    //   formulario: form,
    //   title: title,
    //   special: false,
    // };
    // this.srvModal.setFormModal(this.elementForm);
    // this.srvModal.openModal();
    const dialogRef = this.dialog.open(ModalInfoIncidenciaComponent, {
      width: '800px',
      height: '600px',
      data: { incidencia, title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  filtrarIncidencia( filtro:any){
    this.filtrando = true;
    Swal.fire({
      title: 'Aplicando filtro...',
      icon:'success',
      timer:900,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    switch (filtro) {
      case "Protocolo TCP":
        this.filtroActual = "Protocolo TCP";
        this.filtrando = true;
        this.srvIncidencias.filtrarIncidenciasGeneral("tcp",1)
        this.verificarData();
        break;
      case "Ver inactivos":
        this.filtroActual = "Ver usuarios inactivos";
        this.filtrando = true;
        this.srvIncidencias.filtrarIncidenciasGeneral("INACTIVO",1)
        this.verificarData();
        break;
      case "Ver todo":
        this.filtroActual = "Ver todo";
        this.srvIncidencias.obtenerIncidencias({
          page:1,
          limit:10
        })
        this.verificarData();
        break;
      case "Risk Factor Medium":
        this.filtroActual = "Risk Factor Medium";
        this.srvIncidencias.filtrarIncidenciasGeneral("Medium",1)
        this.verificarData();
        break;
      case "Risk Factor High":
        this.filtroActual = "Risk Factor High";
        this.srvIncidencias.filtrarIncidenciasGeneral("High",1)
        this.verificarData();
        break;
      case "Risk Factor Low":
        this.filtroActual = "Risk Factor Low";
        this.srvIncidencias.filtrarIncidenciasGeneral("Low",1)
        this.verificarData();
        break;
      case "Risk Factor Critical":
        this.filtroActual = "Risk Factor Critical";
        this.srvIncidencias.filtrarIncidenciasGeneral("Critical",1)
        this.verificarData();
        break;
    }
  }

  changePage(page: number) {
    this.request = true;

    this.currentPage = page;
    //comprobar si se esta filtrando para cambiar la pagina
    if(this.filtroActual === 'Protocolo TCP'){

      this.srvIncidencias.filtrarIncidenciasGeneral('tcp',page)
    }
    if(this.filtroActual === 'Risk Factor Medium'){

      this.srvIncidencias.filtrarIncidenciasGeneral('Medium',page)
    }
    if(this.filtroActual === 'Risk Factor High'){

      this.srvIncidencias.filtrarIncidenciasGeneral('High',page)
    }
    if(this.filtroActual === 'Risk Factor Low'){

      this.srvIncidencias.filtrarIncidenciasGeneral('Low',page)
    }
    if(this.filtroActual === 'Risk Factor Critical'){

      this.srvIncidencias.filtrarIncidenciasGeneral('Critical',page)
    }

    if(this.filtroActual === 'Ver usuarios inactivos'){

      this.srvIncidencias.filtrarIncidenciasGeneral('INACTIVO',page)
    }
    if(this.searchText !== ''){

      this.srvIncidencias.buscarIncidenciasGeneral(this.searchText,page)
    }
    if(this.filtroActual === 'Ver todo' && this.searchText === ''){

      this.srvIncidencias.obtenerIncidencias({
        page: page,
        limit: 10,
      });
    }
  }

}
