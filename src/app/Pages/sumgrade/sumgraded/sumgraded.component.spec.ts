import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumgradedComponent } from './sumgraded.component';

describe('SumgradedComponent', () => {
  let component: SumgradedComponent;
  let fixture: ComponentFixture<SumgradedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumgradedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumgradedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
