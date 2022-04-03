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

  public save(productData: any ) {
    return this.http.post(`/api/v1/products`, productData);
  }

  public update(productData: any ) {
    return this.http.put(`/api/v1/products/${productData.id}`, productData);
  }

  public delete(id: string ) {
    return this.http.delete(`/api/v1/products/${id}`);
  }

  public findById(id: string) {
    return this.http.get(`/api/v1/products/${id}`);
  }
}
