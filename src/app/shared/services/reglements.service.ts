import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reglements/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class ReglementsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  };

  constructor(private http: HttpClient) {
  }

  getallByFournisseur(id): Observable<any> {
    return this.http.get(`${API_URL + 'allF'}/${id}`);
  }
  getallByClient(id): Observable<any> {
    return this.http.get(`${API_URL + 'findallC'}/${id}`);
  }
  getallEcheancierFournisseus(id): Observable<any> {
    return this.http.get(`${API_URL + 'echeanceF/all'}/${id}`);
  }
  getallEcheancierClients(id): Observable<any> {
    return this.http.get(`${API_URL + 'echeanceC/all'}/${id}`);
  }
  getallReglementsFournisseurs(id): Observable<any> {
    return this.http.get(`${API_URL + 'alll'}/${id}`);
  }
  getallImpayesFournisseurs(id): Observable<any> {
    return this.http.get(`${API_URL + 'all/impaye/fournisseur'}/${id}`);
  }

  getallRegelementsClients(id): Observable<any> {
    return this.http.get(`${API_URL + 'alll/Clients'}/${id}`);
  }
  getallImpayesClients(id): Observable<any> {
    return this.http.get(`${API_URL + 'all/impaye/client'}/${id}`);
  }
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }
  findByName(name): Observable<any> {
    return this.http.get(`${API_URL + 'findn'}/${name}`);
  }

  importerFournisseurs(datedebut, datefin): Observable<any> {
    return this.http.post(`${API_URL + 'importer/fournisseurs'}/${datedebut}/${datefin}`, {}, this.httpOptions);
  }
  impayeFournisseurs(iduser, num): Observable<any> {
    return this.http.put(`${API_URL + 'impaye/fournisseur'}/${iduser}/${num}`, {}, this.httpOptions);
  }
  impayeClient(iduser, num): Observable<any> {
    return this.http.put(`${API_URL + 'impaye/client'}/${iduser}/${num}`, {}, this.httpOptions);
  }
  importerClients(datedebut, datefin): Observable<any> {
    return this.http.post(`${API_URL + 'importer/clients'}/${datedebut}/${datefin}`, {}, this.httpOptions);
  }

  addFournisseurs(reglement): Observable<any> {
    return this.http.post(`${API_URL + 'add/fournisseur'}`, {
      reference: reglement.value.reference,
      banque: reglement.value.banque,
      dateEcheance: reglement.value.dateEcheance,
      percentageRs: reglement.value.percentageRs,
      rs: reglement.value.rs,
      type: reglement.value.type,
      numpiece: reglement.value.numpiece,
      solde: reglement.value.solde,
      soldedev: reglement.value.soldedev,
      idfournisseur: reglement.value.idfournisseur,
    }, this.httpOptions);
  }
  reglerImpayer(id, reglement): Observable<any> {
    return this.http.post(`${API_URL + 'regler/impayer'}/${id}`, {
      reference: reglement.value.reference,
      banque: reglement.value.banque,
      dateEcheance: reglement.value.dateEcheance,
      percentageRs: reglement.value.percentageRs,
      type: reglement.value.type,
      numpiece: reglement.value.numpiece,
    }, this.httpOptions);
  }
  addClients(reglement): Observable<any> {
    return this.http.post(`${API_URL + 'add/client'}`, {
      reference: reglement.value.reference,
      banque: reglement.value.banque,
      percentageRs: reglement.value.percentageRs,
      rs: reglement.value.rs,
      type: reglement.value.type,
      numpiece: reglement.value.numpiece,
      solde: reglement.value.solde,
      soldedev: reglement.value.soldedev,
      idclient: reglement.value.idclient,
    }, this.httpOptions);
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
