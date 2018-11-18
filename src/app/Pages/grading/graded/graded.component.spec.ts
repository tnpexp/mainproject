import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedComponent } from './graded.component';

describe('GradedComponent', () => {
  let component: GradedComponent;
  let fixture: ComponentFixture<GradedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
