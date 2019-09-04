import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userType = this.auth.getUserType();
    const token = this.auth.getToken();
    if (token != null && userType === 'Employee') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
