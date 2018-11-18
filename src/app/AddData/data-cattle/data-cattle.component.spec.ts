import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCattleComponent } from './data-cattle.component';

describe('DataCattleComponent', () => {
  let component: DataCattleComponent;
  let fixture: ComponentFixture<DataCattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
