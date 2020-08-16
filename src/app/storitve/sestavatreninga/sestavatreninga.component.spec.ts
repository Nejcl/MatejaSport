import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SestavatreningaComponent } from './sestavatreninga.component';

describe('SestavatreningaComponent', () => {
  let component: SestavatreningaComponent;
  let fixture: ComponentFixture<SestavatreningaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SestavatreningaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SestavatreningaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
