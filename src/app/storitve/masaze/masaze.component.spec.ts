import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasazeComponent } from './masaze.component';

describe('MasazeComponent', () => {
  let component: MasazeComponent;
  let fixture: ComponentFixture<MasazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
