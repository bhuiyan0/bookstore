import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const userType = this.auth.getUserType();
    const token = this.auth.getToken();
    if (token != null && userType === 'Employee' || userType === 'Customer') {
      return true;
    } else {
      this.router.navigate(['/store']);
      return false;
    }
  }

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userType = this.auth.getUserType();
    const token = this.auth.getToken();
    if (token != null && userType === 'Employee' || userType === 'Customer') {
      return true;
    } else {
      this.router.navigate(['/store']);
      return false;
    }
  }

}
