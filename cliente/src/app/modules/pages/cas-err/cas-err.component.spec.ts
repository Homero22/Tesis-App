/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasErrComponent } from './cas-err.component';

describe('CasErrComponent', () => {
  let component: CasErrComponent;
  let fixture: ComponentFixture<CasErrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasErrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
