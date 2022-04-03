import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get(`/api/v1/products-groups`);
  }

  public save(data: any ) {
    return this.http.post(`/api/v1/products-groups`, data);
  }

  public update(data: any ) {
    return this.http.put(`/api/v1/products-groups/${data.id}`, data);
  }

  public delete(id: string ) {
    return this.http.delete(`/api/v1/products-groups/${id}`);
  }

  public findById(id: string) {
    return this.http.get(`/api/v1/products-groups/${id}`);
  }
}
