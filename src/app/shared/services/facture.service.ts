import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Validators} from '@angular/forms';

const API_URL = 'http://localhost:8080/api/factures/';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'

})
export class FactureService {
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
  getallNonAffecte(id): Observable<any> {
    console.log('id', id)
    return this.http.get(`${API_URL + 'allNonAffecte'}/${id}`);
  }
  getallByClient(id): Observable<any> {
    return this.http.get(`${API_URL + 'findallC'}/${id}`);
  }
  getallDocumentsFournisseurs(id): Observable<any> {
    return this.http.get(`${API_URL + 'alll'}/${id}`);
  }
  getallDocumentsClients(id): Observable<any> {
    return this.http.get(`${API_URL + 'alll/Clients'}/${id}`);
  }
  findById(id): Observable<any> {
    return this.http.get(`${API_URL + 'find'}/${id}`);
  }
  findByName(name): Observable<any> {
    return this.http.get(`${API_URL + 'findn'}/${name}`);
  }
  getFactureFournisseur(piece) {
    return this.http.get(`${API_URL + 'find/fournisseur'}/${piece}`);
  }
  getFactureClient(piece) {
    return this.http.get(`${API_URL + 'find/Client'}/${piece}`);
  }
  importerFournisseurs(idfournisseur): Observable<any> {
    return this.http.post(`${API_URL + 'importer/fournisseurs'}/${idfournisseur}`, {}, this.httpOptions);
  }
  reglerFournisseurs(reglement, piece): Observable<any> {
    return this.http.post(`${API_URL + 'regler/fournisseurs'}/${piece}`, {
      solde: reglement.value.solde,
      reference: reglement.value.reference,
      idcaisse: reglement.value.idcaisse,
      rs: reglement.value.rs,
      dateEcheance: reglement.value.dateEcheance,
      percentageRs: reglement.value.percentageRs,
      type: reglement.value.type,
      banque: reglement.value.banque,
      numpiece : reglement.value.numpiece,
      idbanque: reglement.value.idbanque,
    }, this.httpOptions);
  }
  reglerClients(reglement, piece): Observable<any> {
    return this.http.post(`${API_URL + 'regler/clients'}/${piece}`, {
      solde: reglement.value.solde,
      reference: reglement.value.reference,
      idcaisse: reglement.value.idcaisse,
      rs: reglement.value.rs,
      dateEcheance: reglement.value.dateEcheance,
      percentageRs: reglement.value.percentageRs,
      type: reglement.value.type,
      banque: reglement.value.banque,
      numpiece : reglement.value.numpiece,
      idbanque: reglement.value.idbanque,
    }, this.httpOptions);
  }
  importerClients(idfournisseur): Observable<any> {
    return this.http.post(`${API_URL + 'importer/clients'}/${idfournisseur}`, {}, this.httpOptions);
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
