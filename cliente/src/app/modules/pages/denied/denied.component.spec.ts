/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeniedComponent } from './denied.component';

describe('DeniedComponent', () => {
  let component: DeniedComponent;
  let fixture: ComponentFixture<DeniedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
