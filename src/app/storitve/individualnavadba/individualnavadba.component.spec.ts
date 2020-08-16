import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualnavadbaComponent } from './individualnavadba.component';

describe('IndividualnavadbaComponent', () => {
  let component: IndividualnavadbaComponent;
  let fixture: ComponentFixture<IndividualnavadbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualnavadbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualnavadbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
