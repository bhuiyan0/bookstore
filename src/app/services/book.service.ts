import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookViewModel, BookEditModel } from '../model/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publisher } from '../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  rootURl = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/book';
  opts = [];



  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<BookViewModel[]> {
    return this.http.get<BookViewModel[]>(this.url);
  }

  getById(id: number): Observable<BookViewModel> {
    return this.http.get<BookViewModel>(`${this.url}/${id}`);
  }



  // getData() {
  //   return this.opts.length ?
  //     of(this.opts) :
  //     this.http.get<any>(this.url).pipe(tap(data => this.opts = data));
  // }


  getCategory() {
    return this.http.get(`${this.rootURl}/api/category`);
  }

  getPublisher() {
    return this.http.get(`${this.rootURl}/api/publisher`);
  }

  getAutor() {
    return this.http.get(`${this.rootURl}/api/author`);
  }

  create(book: BookViewModel): Observable<BookViewModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<BookViewModel>(`${this.url}/create`, book, httpOptions);
  }

  update(id: number, book: BookEditModel): Observable<BookEditModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<BookEditModel>(`${this.url}/${id}`, book, httpOptions);
  }


  // Added by nasir for store
  getBookByAuthorId(id: any): Observable<BookViewModel[]>  {
    return this.http.get<BookViewModel[]>(`${this.url}/GetByAuthor/${id}`);
  }

  //  Added by nasir for store
  getBookByCategoryId(id: any): Observable<BookViewModel[]> {
    return this.http.get<BookViewModel[]>(`${this.url}/GetByCategory/${id}`);
  }

  getBookByPublisherId(id: any): Observable<BookViewModel> {
    return this.http.get<BookViewModel>(`${this.url}/GetByPublisher/${id}`);
  }
  // delete(id: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.delete(this.url + '/' + id, httpOptions);
  // }

  // softDelete(id: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put(this.url + '/Delete/' + id, httpOptions);
  // }

  // updateStart(id: any): Observable<Category> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<Category>(this.url + '/' + id, httpOptions);
  // }


}
