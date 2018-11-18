import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSumgradeComponent } from './set-sumgrade.component';

describe('SetSumgradeComponent', () => {
  let component: SetSumgradeComponent;
  let fixture: ComponentFixture<SetSumgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSumgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSumgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
