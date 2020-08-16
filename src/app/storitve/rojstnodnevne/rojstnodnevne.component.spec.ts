import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RojstnodnevneComponent } from './rojstnodnevne.component';

describe('RojstnodnevneComponent', () => {
  let component: RojstnodnevneComponent;
  let fixture: ComponentFixture<RojstnodnevneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RojstnodnevneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RojstnodnevneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
