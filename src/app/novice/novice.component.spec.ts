import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviceComponent } from './novice.component';

describe('NoviceComponent', () => {
  let component: NoviceComponent;
  let fixture: ComponentFixture<NoviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
