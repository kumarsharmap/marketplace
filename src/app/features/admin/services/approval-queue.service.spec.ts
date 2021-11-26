import { TestBed } from '@angular/core/testing';

import { ApprovalQueueService } from './approval-queue.service';

describe('ApprovalQueueService', () => {
  let service: ApprovalQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
