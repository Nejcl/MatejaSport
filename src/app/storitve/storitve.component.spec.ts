import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoritveComponent } from './storitve.component';

describe('StoritveComponent', () => {
  let component: StoritveComponent;
  let fixture: ComponentFixture<StoritveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoritveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoritveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
