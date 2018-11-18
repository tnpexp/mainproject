import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsetComponent } from './navset.component';

describe('NavsetComponent', () => {
  let component: NavsetComponent;
  let fixture: ComponentFixture<NavsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
