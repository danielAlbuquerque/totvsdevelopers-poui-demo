import { TestBed } from '@angular/core/testing';

import { ProtheusInterceptor } from './protheus.interceptor';

describe('ProtheusInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProtheusInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProtheusInterceptor = TestBed.inject(ProtheusInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
