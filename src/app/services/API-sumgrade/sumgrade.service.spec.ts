import { TestBed } from '@angular/core/testing';

import { SumgradeService } from './sumgrade.service';

describe('SumgradeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SumgradeService = TestBed.get(SumgradeService);
    expect(service).toBeTruthy();
  });
});
