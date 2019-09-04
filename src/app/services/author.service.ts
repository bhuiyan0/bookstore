import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = localStorage.getItem('apiKey') + '/api/author';
  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url);
  }

  getActiveAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}/GetActive`);
  }

  getById(id: any): Observable<Author> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Author>(`${this.url}/${id}`, httpOptions);
  }

  create(author: Author): Observable<Author> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Author>(this.url, author, httpOptions);
  }

  // delete(id: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.delete(this.url + '/' + id, httpOptions);
  // }

  softDelete(id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(`${this.url}/Delete/${id}`, httpOptions);
  }

  update(id: any, author: Author): Observable<Author> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Author>(`${this.url}/${id}`, author, httpOptions);
  }
}
