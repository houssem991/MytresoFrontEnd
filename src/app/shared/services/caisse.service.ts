import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {th} from 'date-fns/locale';

const API_URL = 'http://localhost:8080/api/caisse/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
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
  findAllWithoutCurrent(id , iduser): Observable<any> {
    return this.http.get(`${API_URL + 'all/notCurrent'}/${id}/${iduser}`);
  }

  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);
  }
   add(caisse) {
     return this.http.post(`${API_URL + 'add'}`, {
       libelle: caisse.value.libelle,
       solde: caisse.value.solde,
       iduser: caisse.value.iduser,
     }, this.httpOptions);
   }
  update(id, caisse) {
    return this.http.put(`${API_URL + 'update'}/${id}`, {
      libelle: caisse.value.libelle,
      solde: caisse.value.solde,
      iduser: caisse.value.iduser,
    }, this.httpOptions);
  }
    alimenter(id, somme) {
        return this.http.put(`${API_URL + 'alimenter'}/${id}`, {
            montant: somme.value.montant,
            idcaisse: somme.value.idcaisse,
            idbanque: somme.value.idbanque,
        }, this.httpOptions);
    }


}
