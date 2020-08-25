import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivacijaUporabnikovComponent } from './aktivacija-uporabnikov.component';

describe('AktivacijaUporabnikovComponent', () => {
  let component: AktivacijaUporabnikovComponent;
  let fixture: ComponentFixture<AktivacijaUporabnikovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivacijaUporabnikovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivacijaUporabnikovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
