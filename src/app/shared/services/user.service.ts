import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly API_URL = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  uploadimage(id: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}uploadImage/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


    return this.http.request(req);
  }
  uploadcv(id: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}uploadcv/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


    return this.http.request(req);
  }
}
