import { TestBed } from '@angular/core/testing';

import { PozivService } from './poziv.service';

describe('PozivService', () => {
  let service: PozivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PozivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
