import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KjesmoComponent } from './kjesmo.component';

describe('KjesmoComponent', () => {
  let component: KjesmoComponent;
  let fixture: ComponentFixture<KjesmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KjesmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KjesmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
