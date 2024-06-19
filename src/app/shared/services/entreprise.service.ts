import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/entreprise/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class EntrepriseService {
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
  findByName(name): Observable<any> {
    return this.http.get(`${API_URL + 'findn'}/${name}`);
  }
  add(entreprise): Observable<any> {
    return this.http.post(API_URL + 'add', {
      name: entreprise.value.name,
      matriculefiscale: entreprise.value.matriculefiscale,
      adresse: entreprise.value.adresse,
      iduser: entreprise.value.iduser
    }, this.httpOptions);
  }
  update(id , entreprise): Observable<any> {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      name: entreprise.value.name,
      matriculefiscale: entreprise.value.matriculefiscale,
      adresse: entreprise.value.adresse,
      iduser: entreprise.value.iduser
    }, this.httpOptions);
  }
  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);

  }
  uploadimage(id: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${API_URL + 'uploadImage'}/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


    return this.http.request(req);
  }
}
