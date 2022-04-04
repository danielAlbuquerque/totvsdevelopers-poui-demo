import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService implements PoLookupFilter {

  constructor(
    private http: HttpClient
  ) { }
  
  getObjectByValue(value: string | any[], filterParams?: any): Observable<any> {
    return this.http.get<PoLookupResponseApi>(`/api/v1/warehouses/${value}`);
  }

  getFilteredItems?(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    return this.http.get<PoLookupResponseApi>(`/api/v1/warehouses`);
  }
}
