import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazpsTerminaComponent } from './razps-termina.component';

describe('RazpsTerminaComponent', () => {
  let component: RazpsTerminaComponent;
  let fixture: ComponentFixture<RazpsTerminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazpsTerminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazpsTerminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
