import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {th} from 'date-fns/locale';

const API_URL = 'http://localhost:8080/api/banque/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
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

  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);
  }
   add(banque) {
     return this.http.post(`${API_URL + 'add'}`, {
       nom: banque.value.nom,
       adresse: banque.value.adresse,
       telephone: banque.value.telephone,
       solde: banque.value.solde,
       iduser: banque.value.iduser,
     }, this.httpOptions);
   }
  update(id, banque) {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      nom: banque.value.nom,
      adresse: banque.value.adresse,
      telephone: banque.value.telephone,
      solde: banque.value.solde,
      iduser: banque.value.iduser,
    }, this.httpOptions);
  }


}
