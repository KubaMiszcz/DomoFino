import { TestBed } from '@angular/core/testing';

import { ParagonService } from '../services/paragon.service';

describe('ParagonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParagonService = TestBed.get(ParagonService);
    expect(service).toBeTruthy();
  });
});
