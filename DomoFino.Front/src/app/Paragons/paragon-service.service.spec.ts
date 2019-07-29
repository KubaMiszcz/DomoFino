import { TestBed } from '@angular/core/testing';

import { ParagonServiceService } from './paragon-service.service';

describe('ParagonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParagonServiceService = TestBed.get(ParagonServiceService);
    expect(service).toBeTruthy();
  });
});
