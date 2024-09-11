import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {th} from 'date-fns/locale';

const API_URL = 'http://localhost:8080/api/imputation/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {
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
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }

  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);
  }
   add(imputation) {
     return this.http.post(`${API_URL + 'add'}`, {
       montant: imputation.value.montant,
       idcaisse: imputation.value.idcaisse,
       idreglement: imputation.value.idreglement,
       piece: imputation.value.piece,
     }, this.httpOptions);
   }
  update(id, imputation) {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      montant: imputation.value.montant,
      idcaisse: imputation.value.idcaisse,
      idreglement: imputation.value.idreglement,
      piece: imputation.value.piece,
    }, this.httpOptions);
  }
  importer(id): Observable<any> {
    return this.http.post(`${API_URL + 'importer'}/${id}`, {}, this.httpOptions);
  }


}
