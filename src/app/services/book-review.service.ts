import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookReview } from '../model/book-review';

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {

  rootURl = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/BookReview';

  constructor(
    private http: HttpClient
  ) { }

  getByBookId(id: number): Observable<BookReview> {
    return this.http.get<BookReview>(`${this.url}/GetReviewById/${id}`)
  }

  create(review: BookReview): Observable<BookReview> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<BookReview>(`${this.url}`, review, httpOptions);
  }
}
