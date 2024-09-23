import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {th} from 'date-fns/locale';

const API_URL = 'http://localhost:8080/api/mouvement/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  };

  constructor(private http: HttpClient) {
  }

  getall(id): Observable<any> {
    return this.http.get(`${API_URL + 'all'}/${id}`);
  }


  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);
  }
  getallBanque(id): Observable<any> {
    return this.http.get(`${API_URL + 'all/banque'}/${id}`);
  }


  deleteBanque(id) {
    return this.http.delete(`${API_URL + 'delete/banque'}/${id}`);
  }
}
