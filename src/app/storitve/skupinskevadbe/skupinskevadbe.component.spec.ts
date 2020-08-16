import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkupinskevadbeComponent } from './skupinskevadbe.component';

describe('SkupinskevadbeComponent', () => {
  let component: SkupinskevadbeComponent;
  let fixture: ComponentFixture<SkupinskevadbeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkupinskevadbeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkupinskevadbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
