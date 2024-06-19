import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/access/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class AccessService {
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
  findaccessByIdrole(id): Observable<any> {
    return this.http.get(`${API_URL + 'allr'}/${id}`);
  }
  findByIdrole(id): Observable<any> {
    return this.http.get(`${API_URL + 'alla'}/${id}`);
  }
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }
  findByAccessAndRole(idrole, idaccess): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${idrole}/${idaccess}`);
  }
  findByAccessTitleAndRole( idrole, title): Observable<any> {
    return this.http.get(`${API_URL + 'finda'}/${idrole}/${title}`);
  }
  add(role): Observable<any> {
    return this.http.post(API_URL + 'add', {
      roleid: role.value.roleid,
      accesid: role.value.accesid,
      ajouter: role.value.ajouter,
      modifier: role.value.modifier,
      supprimer: role.value.supprimer,
      consulter: role.value.consulter
    }, this.httpOptions);
  }
  update(idrole , idaccess , role): Observable<any> {
    return this.http.put(`${API_URL + 'update'}/${idrole}/${idaccess}`, {
      roleid: role.value.roleid,
      accesid: role.value.accesid,
      ajouter: role.value.ajouter,
      modifier: role.value.modifier,
      supprimer: role.value.supprimer,
      consulter: role.value.consulter
    }, this.httpOptions);
  }
  delete(idrole, idaccess) {
    return this.http.delete(`${API_URL + 'delete'}/${idrole}/${idaccess}`);

  }
}
