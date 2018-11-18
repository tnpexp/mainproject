import { TestBed } from '@angular/core/testing';

import { GradedService } from './graded.service';

describe('GradedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradedService = TestBed.get(GradedService);
    expect(service).toBeTruthy();
  });
});
