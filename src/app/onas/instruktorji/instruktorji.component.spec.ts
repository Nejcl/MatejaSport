import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruktorjiComponent } from './instruktorji.component';

describe('InstruktorjiComponent', () => {
  let component: InstruktorjiComponent;
  let fixture: ComponentFixture<InstruktorjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
