import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  loginForm: FormGroup;

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;

  isLoginError: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  Login() {
    const user = this.loginForm.value;
    this.isLoggedIn = false;
    this.authService.removeToken();
    this.authService.removeUserType();
    this.authService.removeUserName();
    this.authService.removeUserId();
    this.authService.removeFirstName();
    this.authService.ValidateUser(user)
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => { // This is error part
          console.log(error.message);
        },
        () => {
          //  This is Success part
          this.authService.storeToken(this.globalResponse.access_token);
          this.authService.storeUserName(this.globalResponse.userName);
          this.authService.storeFirstName(this.globalResponse.firstName);
          this.authService.storeUserType(this.globalResponse.userType);
          this.authService.storeUserId(this.globalResponse.id);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard/home']);
        }
      );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
