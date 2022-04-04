import { TestBed } from '@angular/core/testing';

import { UnityMeasureService } from './unity-measure.service';

describe('UnityMeasureService', () => {
  let service: UnityMeasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnityMeasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
