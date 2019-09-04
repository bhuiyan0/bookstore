import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Wishlist } from '../model/wishlist';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  rootURL = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/wishlist';
  constructor(private http: HttpClient) {
   
   }

  create(uId: string, bId: number) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`${this.url}?uId=${uId}&bId=${bId}`, null);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getByUser(uId: string): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(`${this.url}/GetByUser/${uId}`);
  }

}
