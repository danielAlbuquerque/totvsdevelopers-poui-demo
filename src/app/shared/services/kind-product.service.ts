import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KindProductService implements PoLookupFilter {

  constructor(
    private http: HttpClient
  ) { }
  
  getObjectByValue(value: string | any[], filterParams?: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getFilteredItems?(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    return this.http.get<PoLookupResponseApi>(`/api/v1/kind-products`);
  }
}
