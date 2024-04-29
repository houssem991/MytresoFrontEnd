import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8081/api/auth/';
const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  API_URLl = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) {
  }

  getall(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  findById(id): Observable<any> {
    return this.http.get(`${this.API_URLl + 'find'}/${id}`);
  }
  findByUsername(id): Observable<any> {
    return this.http.get(`${this.API_URLl + 'findu'}/${id}`);
  }
  delete(id) {
    return this.http.delete(`${this.API_URLl + 'delete'}/${id}`);
  }
  valider(id) {
    // @ts-ignore
    return this.http.put(`${this.API_URLl + 'validation'}/${id}`);

  }
  updatebac(id, user) {
    return this.http.put(`${API_URL + 'updatebac'}/${id}`, {
      firstname: user.firstname,
      secondname: user.secondname,
      cin: user.cin,
      role: user.role
    });
  }
   update(id, user) {
     return this.http.put(`${API_URL + 'update'}/${id}`, {
       email: user.email,
       firstname: user.firstname,
       secondname: user.secondname,
       adresse: user.adresse,
       cin: user.cin,
       bac : user.bac,
       niveau: user.niveau,
       description : user.description,
       hobbies: user.hobbies,
       experience: user.experience,
       datenaissance: user.datenaissance,
       role: user.role
     });
   }


}
