import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsuserComponent } from './listsuser.component';

describe('ListsuserComponent', () => {
  let component: ListsuserComponent;
  let fixture: ComponentFixture<ListsuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
