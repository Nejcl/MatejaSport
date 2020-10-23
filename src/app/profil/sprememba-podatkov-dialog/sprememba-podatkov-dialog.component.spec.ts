import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpremembaPodatkovDialogComponent } from './sprememba-podatkov-dialog.component';

describe('SpremembaPodatkovDialogComponent', () => {
  let component: SpremembaPodatkovDialogComponent;
  let fixture: ComponentFixture<SpremembaPodatkovDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpremembaPodatkovDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpremembaPodatkovDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
