import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, ChangePasswordModel } from '../model/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  opts = [];
  url = localStorage.getItem('apiKey') + '/api/account';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  create(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };
    return this.http.post<User>(`${this.url}/Register/SystemUser`, user, httpOptions);
  }

  createCustomer(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };
    return this.http.post<User>(`${this.url}/Register/Customer`, user, httpOptions);
  }

  // for testing auto complete

  getData() {
    return this.opts.length
      ? of(this.opts)
      : this.http
        .get<any>(this.url + '/users')
        .pipe(tap(data => (this.opts = data)));
  }
  getById(id: any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<User>(`${this.url}/${id}`, httpOptions);
  }


  getByUserId(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }


  update(id: any, user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>(`${this.url}/update/${id}`, user, httpOptions);
  }

  delete(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }

  changePassword(id: string, model: ChangePasswordModel) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(`${this.url}/changepassword/${id}`, model, httpOptions);
  }
}
