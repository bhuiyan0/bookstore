import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  url = localStorage.getItem('apiKey') + '/api/category';
  opts = [];
  constructor(private http: HttpClient) { }

  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.url).pipe(tap(data => this.opts = data));
  }
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getByCategoryName(name: string) {
    return this.http.get<any[]>(`${this.url}/${name}`);
  }

  getAllActive(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/GetActive');
  }

  getAllInactive(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/GetInactive');
  }

  getCategory(id: any): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/' + id);
  }

  create(category: Category): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Category>(this.url, category, httpOptions);
  }

  delete(id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(this.url + '/' + id, httpOptions);
  }

  softDelete(id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.url + '/Delete/' + id, httpOptions);
  }

  updateStart(id: any): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Category>(this.url + '/' + id, httpOptions);
  }

  update(id: any, category: Category): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Category>(this.url + '/' + id, category, httpOptions);
  }

   // Added by Nasir for store
   getById(id: any): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Category>(`${this.url}/${id}`, httpOptions);
  }
}
