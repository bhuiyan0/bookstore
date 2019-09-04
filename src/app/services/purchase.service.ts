import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  BookViewModel } from '../model/book';
import { OrderViewModel  } from '../model/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  rootURl = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/purchase';

  constructor(private http: HttpClient) { }


  create(book: BookViewModel): Observable<BookViewModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<BookViewModel>(`${this.url}/insert`, book, httpOptions);
  }

  getAll(): Observable<OrderViewModel[]> {
    return this.http.get<OrderViewModel[]>(this.url);
  }

}
