import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from '../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  url = localStorage.getItem('apiKey') + '/api/publisher';
  constructor(private http: HttpClient) { }

  getAllPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.url);
  }


  getById(id: any): Observable<Publisher> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Publisher>(`${this.url}/${id}`, httpOptions);
  }

  getActiveAuthors(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.url}/GetActive`);
  }

  create(publisher: Publisher): Observable<Publisher> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Publisher>(this.url, publisher, httpOptions);
  }

  update(id: any, publisher: Publisher): Observable<Publisher> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Publisher>(`${this.url}/${id}`, publisher, httpOptions);
  }

  softDelete(id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(`${this.url}/Delete/${id}`, httpOptions);
  }
}