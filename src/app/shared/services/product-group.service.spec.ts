import { TestBed } from '@angular/core/testing';

import { ProductGroupService } from './product-group.service';

describe('ProductGroupService', () => {
  let service: ProductGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
