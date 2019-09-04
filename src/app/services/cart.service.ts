import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Wishlist } from '../model/wishlist';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  rootURL = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/cart';

  constructor(
    private http: HttpClient
  ) { }

  create(uId: string, bId: number) {
    return this.http.post(`${this.url}?uId=${uId}&bId=${bId}`, null);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getByUser(uId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.url}/GetByUser/${uId}`);
  }

  cartTotal(id: any): any {
    return this.http.get(`${this.url}/CartTotal/${id}`);
  }

  deleteByUserId(id: string) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
