import { Component, OnInit } from '@angular/core';
import {  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info-incidencia',
  templateUrl: './modal-info-incidencia.component.html',
  styleUrls: ['./modal-info-incidencia.component.css']
})
export class ModalInfoIncidenciaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInfoIncidenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  get incidencia() {
    return this.data.incidencia;
  }

  get title() {
    return this.data.title;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
