/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncidenciasComponent } from './incidencias.component';

describe('IncidenciasComponent', () => {
  let component: IncidenciasComponent;
  let fixture: ComponentFixture<IncidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
