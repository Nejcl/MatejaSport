import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTerminDialogComponent } from './edit-termin-dialog.component';

describe('EditTerminDialogComponent', () => {
  let component: EditTerminDialogComponent;
  let fixture: ComponentFixture<EditTerminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTerminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTerminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
