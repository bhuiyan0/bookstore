import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = localStorage.getItem('apiKey');
  constructor(private httpClient: HttpClient) { }


  ValidateUser(user: any) {
    const userData = 'username=' + user.userName + '&password=' + user.password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });

    return this.httpClient.post(this.apiURL + '/token', userData, { headers: reqHeader })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  signout() {
    return this.httpClient.post(this.apiURL + '/api/account/logout', null)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // maange token
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // mangae user name
  storeUserName(name: string) {
    localStorage.setItem('un', name);
  }
  getUserName() {
    return localStorage.getItem('un');
  }
  removeUserName() {
    localStorage.removeItem('un');
  }

  // mangae first name
  storeFirstName(name: string) {
    localStorage.setItem('fn', name);
  }
  getFirstName() {
    return localStorage.getItem('fn');
  }
  removeFirstName() {
    localStorage.removeItem('fn');
  }

  // mangae user id
  storeUserId(userId: string) {
    localStorage.setItem('ui', userId);
  }
  getUserId() {
    return localStorage.getItem('ui');
  }
  removeUserId() {
    localStorage.removeItem('ui');
  }

  // mangae user type
  storeUserType(usertype: string) {
    localStorage.setItem('ut', usertype);
  }
  getUserType() {
    return localStorage.getItem('ut');
  }
  removeUserType() {
    localStorage.removeItem('ut');
  }
  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }


  // getClaims() {
  //   const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
  //   reqHeader.append('Content-Type', 'application/json');
  //   return this.httpClient.get(this.apiURL + 'api/Users', { headers: reqHeader })
  //     .pipe(
  //       map(res => res),
  //       catchError(this.errorHandler)
  //     );
  // }
}
