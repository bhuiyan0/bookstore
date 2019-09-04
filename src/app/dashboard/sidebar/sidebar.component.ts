import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = this.authService.getFirstName();
  }
  logout() {
    this.authService.removeToken();
    this.authService.removeUserType();
    this.authService.removeUserName();
    this.authService.removeUserId();
    this.authService.removeFirstName();
    this.router.navigate(['/login']);
  }
}
