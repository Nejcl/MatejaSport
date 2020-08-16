import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenikComponent } from './cenik.component';

describe('CenikComponent', () => {
  let component: CenikComponent;
  let fixture: ComponentFixture<CenikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
