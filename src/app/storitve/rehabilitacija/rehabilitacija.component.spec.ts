import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitacijaComponent } from './rehabilitacija.component';

describe('RehabilitacijaComponent', () => {
  let component: RehabilitacijaComponent;
  let fixture: ComponentFixture<RehabilitacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitacijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
