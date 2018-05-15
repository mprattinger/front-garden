import { TestBed, inject } from '@angular/core/testing';

import { SprinklerService } from './sprinkler.service';

describe('SprinklerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprinklerService]
    });
  });

  it('should be created', inject([SprinklerService], (service: SprinklerService) => {
    expect(service).toBeTruthy();
  }));
});
