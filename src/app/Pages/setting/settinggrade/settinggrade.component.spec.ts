import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettinggradeComponent } from './settinggrade.component';

describe('SettinggradeComponent', () => {
  let component: SettinggradeComponent;
  let fixture: ComponentFixture<SettinggradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettinggradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettinggradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
