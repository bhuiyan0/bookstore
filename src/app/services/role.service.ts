import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = localStorage.getItem('apiKey') + '/api/roles';
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }

  getByRoleName(name: string) {
    return this.http.get<any[]>(`${this.url}/${name}`);
  }

  getAllActive(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/GetActive');
  }

  getAllInactive(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/GetInactive');
  }

  getRoleById(id: any): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/' + id);
  }

  create(role: Role): Observable<Role> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Role>(this.url+'/create', role, httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + '/delete/' + id);
  }

  
  updateStart(id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + '/' + id, httpOptions);
  }

  update(id: any, role: Role): Observable<Role> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Role>(this.url + '/' + id, role, httpOptions);
  }
}
