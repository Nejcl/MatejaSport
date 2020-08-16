import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruktorBoxComponent } from './instruktor-box.component';

describe('InstruktorBoxComponent', () => {
  let component: InstruktorBoxComponent;
  let fixture: ComponentFixture<InstruktorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstruktorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
