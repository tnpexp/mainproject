import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCattleComponent } from './about-cattle.component';

describe('AboutCattleComponent', () => {
  let component: AboutCattleComponent;
  let fixture: ComponentFixture<AboutCattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
