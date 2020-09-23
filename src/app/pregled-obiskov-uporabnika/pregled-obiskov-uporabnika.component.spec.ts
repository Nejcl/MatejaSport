import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledObiskovUporabnikaComponent } from './pregled-obiskov-uporabnika.component';

describe('PregledObiskovUporabnikaComponent', () => {
  let component: PregledObiskovUporabnikaComponent;
  let fixture: ComponentFixture<PregledObiskovUporabnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledObiskovUporabnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledObiskovUporabnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
