import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CasService } from 'src/app/core/services/cas.service';

@Component({
  selector: 'app-cas-err',
  templateUrl: './cas-err.component.html',
  styleUrls: ['./cas-err.component.css']
})
export class CasErrComponent implements OnInit {
  messageCasError!: string;
  private destroy$ = new Subject<any>();

  constructor(public casService:CasService) {
    console.log("cas-err.component.ts");
  }

  ngOnInit() {
    this.casService.SelectIsMessageCasError$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(data) =>{
        this.messageCasError = data;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
