import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/clients/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class ClientsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  };

  constructor(private http: HttpClient) {
  }

  getall(identreprise, iduser): Observable<any> {
    return this.http.get(`${API_URL + 'allClient'}/${identreprise}/${iduser}`);  }
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }
  findByName(name): Observable<any> {
    return this.http.get(`${API_URL + 'findn'}/${name}`);
  }
  importer(iduser): Observable<any> {
    return this.http.post(`${API_URL + 'importer'}/${iduser}`, {}, this.httpOptions);
  }
  update(id , role): Observable<any> {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      name: role.value.name,
      iduser: role.value.iduser
    }, this.httpOptions);
  }
  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);

  }
}
