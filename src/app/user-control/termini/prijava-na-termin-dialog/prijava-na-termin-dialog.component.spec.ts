import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaNaTerminDialogComponent } from './prijava-na-termin-dialog.component';

describe('PrijavaNaTerminDialogComponent', () => {
  let component: PrijavaNaTerminDialogComponent;
  let fixture: ComponentFixture<PrijavaNaTerminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrijavaNaTerminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijavaNaTerminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
