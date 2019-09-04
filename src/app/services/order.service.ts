import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  BookViewModel } from '../model/book';
import { OrderViewModel, CheckoutViewModel, Order  } from '../model/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartViewModel } from '../model/cart';
import { max } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  rootURl = localStorage.getItem('apiKey');
  url = localStorage.getItem('apiKey') + '/api/order';

  constructor(private http: HttpClient) { }


  create(order: CheckoutViewModel): Observable<CheckoutViewModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<CheckoutViewModel>(`${this.url}/insert`, order, httpOptions);
  }

  getAll(): Observable<OrderViewModel[]> {
    return this.http.get<OrderViewModel[]>(this.url);
  }

  getAllByVM(): Observable<OrderViewModel[]> {
    return this.http.get<OrderViewModel[]>(this.url+'/GetByVM');
  }

 getById(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }

 getOrdersByUserId(id: any) {
    return this.http.get(`${this.url}/GetByUser/${id}`);
  }

 getOrdersOrderId(id: any) {
    return this.http.get(`${this.url}/GetById/${id}`);
  }

 getCartByUser(uId: string): Observable<CartViewModel[]> {
    return this.http.get<CartViewModel[]>(`${this.rootURl}/api/cart/GetByUser/${uId}`);
  }
getLastId():any {
  return this.http.get(`${this.url}/GetLastOrderId`);
}

update(id:any,model:Order):any {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.put(`${this.url}/UpdateOrderStatus/`+id,model,httpOptions);
}

}
