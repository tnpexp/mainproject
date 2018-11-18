import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumgradeComponent } from './sumgrade.component';

describe('SumgradeComponent', () => {
  let component: SumgradeComponent;
  let fixture: ComponentFixture<SumgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
