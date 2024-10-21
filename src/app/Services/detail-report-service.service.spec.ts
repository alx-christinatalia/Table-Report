import { TestBed } from '@angular/core/testing';

import { DetailReportServiceService } from './detail-report-service.service';

describe('DetailReportServiceService', () => {
  let service: DetailReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
