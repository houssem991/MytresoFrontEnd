import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/role/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class RoleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  };

  constructor(private http: HttpClient) {
  }

  getall(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }
  add(role): Observable<any> {
    return this.http.post(API_URL + 'add', {
      name: role.value.name
    }, this.httpOptions);
  }
  update(id , role): Observable<any> {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      name: role.value.name
    }, this.httpOptions);
  }
  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);

  }
}
