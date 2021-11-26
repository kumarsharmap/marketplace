import { TestBed } from '@angular/core/testing';

import { GuideServiceService } from './guide-service.service';

describe('GuideServiceService', () => {
  let service: GuideServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
