import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Layouts } from './layout/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, OnDestroy {
  private destroy$ = new Subject<any>()
  title = 'app';
  Layouts = Layouts;
  layout: Layouts = Layouts.simple


  constructor(private router: Router) {
    console.log('AppComponent en constructor()');
  }

  ngOnInit():void {
    console.log('AppComponent en ngOnInit()');
    this.router.events
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        if (data instanceof RoutesRecognized) {
          console.log("data", data)
          this.layout = data.state.root.firstChild?.data['layout']
        }
      },
      error: (err) => {
        console.log('error', err);
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }
}
