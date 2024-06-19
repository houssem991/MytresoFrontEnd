import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getall(): Observable<any> {
    return this.http.get(AUTH_API + 'all', this.httpOptions);
  }

  findByUsername(id): Observable<any> {
    return this.http.get(`${AUTH_API + 'find'}/${id}`, this.httpOptions);
  }

  delete(id) {
    return this.http.delete(`${AUTH_API + 'delete'}/${id}`, this.httpOptions);

  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, this.httpOptions);
  }
  reset(token: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'restpass', {
      token,
      email,
      password
    }, this.httpOptions);
  }
  forgotpassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'passwordoubli', {
      email
    }, this.httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.value.username,
      firstname: user.value.firstname,
      lastname: user.value.lastname,
      email: user.value.email,
      password: user.value.password,
      role: user.value.role
    }, this.httpOptions);
  }
  registerCollaborator(user): Observable<any> {
    return this.http.post(AUTH_API + 'signupC', {
      username: user.value.username,
      firstname: user.value.firstname,
      lastname: user.value.lastname,
      email: user.value.email,
      password: user.value.password,
      idrole: user.value.idrole,
      identreprise: user.value.identreprise
    }, this.httpOptions);
  }
  inviter(user): Observable<any> {
    return this.http.post(AUTH_API + 'invite', {
      emailCollabrator: user.value.emailCollabrator,
      email: user.value.email,
      idrole: user.value.idrole,
    }, this.httpOptions);
  }

  update(id, user): Observable<any> {
    return this.http.put(`${AUTH_API + 'update'}/${id}`, {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role
    }, this.httpOptions);
  }
  validate(id): Observable<any> {
    return this.http.put(`${AUTH_API + 'validate'}/${id}`, {}, this.httpOptions);
  }
  decryptemail(encryptedemail): Observable<any> {
    return this.http.post(`${AUTH_API + 'decrypt-email'}/${encryptedemail}`, {}, this.httpOptions);
  }


  uploadimage(id: any, file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${AUTH_API + 'uploadImage'}/${id}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });


        return this.http.request(req);
    }
}
