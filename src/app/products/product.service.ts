import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get(`/api/v1/products`);
  }

  public save( productData: any ) {
    return this.http.post(`/api/v1/products`, productData);
  }

  public findById(id: string) {
    return this.http.get(`/api/v1/products/${id}`);
  }
}
