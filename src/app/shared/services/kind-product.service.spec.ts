import { TestBed } from '@angular/core/testing';

import { KindProductService } from './kind-product.service';

describe('KindProductService', () => {
  let service: KindProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
