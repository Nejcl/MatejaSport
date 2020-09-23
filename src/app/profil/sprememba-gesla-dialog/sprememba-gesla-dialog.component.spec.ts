import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpremembaGeslaDialogComponent } from './sprememba-gesla-dialog.component';

describe('SpremembaGeslaDialogComponent', () => {
  let component: SpremembaGeslaDialogComponent;
  let fixture: ComponentFixture<SpremembaGeslaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpremembaGeslaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpremembaGeslaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
