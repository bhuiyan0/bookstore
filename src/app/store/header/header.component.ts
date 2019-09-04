import { Component, OnInit, Injectable } from '@angular/core';
import { DeclareVarStmt } from '@angular/compiler';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AppGlobals } from '../app.global';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AppGlobals]
})
export class HeaderComponent implements OnInit {
  test = false;

  allCategory: any;
  allAuthor: any;
  allPublisher: any;
  sortedAuthor: any;
  sortedCategory: any;
  sortedPublisher: any;

  isLoggedIn = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  message = '';
  public globalResponse: any;

  isLoginError = false;

  firstName: string;
  cartCount: number;
  constructor(
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private global:AppGlobals
  ) { }

  ngOnInit() {
    this.loadDropDowns();
    this.createLoginForm();
    this.createRegisterForm();

    this.firstName = this.authService.getFirstName();

    const token = this.authService.getToken();
    if (isNullOrUndefined(token)) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

   // this.cartCount=this.global.cartCount;
    // this.cartService.cartCount(userId).subscribe(res => {
    //   this.cartCount = res;
    // })
  }

  // ngDoCheck() {
  //   this.firstName = this.authService.getFirstName();
  //   const userId = this.authService.getUserId();
  //   this.cartService.cartCount(userId).subscribe(res => {
  //     this.cartCount = res;
  //   })
  // }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z]')]
      ],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  register() {
   // if (this.registerForm.invalid) {
   //   return;
   // }
    this.userService.createCustomer(this.registerForm.value).subscribe(res => {
      this.closeModal();
      this.registerForm.reset();
    });
  }

  login() {
    const user = this.loginForm.value;
    this.isLoggedIn = false;
    this.authService.removeToken();
    this.authService.removeUserName();
    this.authService.removeUserType();
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
          this.authService.storeUserType(this.globalResponse.userType);
          this.authService.storeFirstName(this.globalResponse.firstName);
          this.authService.storeUserId(this.globalResponse.id);
          this.isLoggedIn = true;
          this.closeModal();
          this.router.navigate(['/store/home']);
        }
      );
  }

  signout() {
    this.isLoggedIn = false;
    this.authService.removeToken();
    this.authService.removeUserName();
    this.authService.removeFirstName();
    this.authService.removeUserId();
    this.authService.removeUserType();
    this.authService.signout();
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    this.router.navigateByUrl('/store', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/store/home'])); 

  }

  closeModal() {
    $('#signInModal').modal('hide');
  }

  openModal() {
    this.registerForm.reset();
    $('#signInModal').modal('show');
  }



  loadDropDowns() {
    this.bookService.getCategory().subscribe(res => {
      this.allCategory = res;
      this.top5();

    });
    this.bookService.getAutor().subscribe(res => {
      this.allAuthor = res;
      this.top5();
    });
    this.bookService.getPublisher().subscribe(res => {
      this.allPublisher = res;
      this.top5();
    })
  }
  top5() {
    this.sortedAuthor = this.allAuthor.slice(Math.max(this.allAuthor.length - 5, 1));
    this.sortedCategory = this.allCategory.slice(Math.max(this.allCategory.length - 5, 1));
    this.sortedPublisher = this.allPublisher.slice(Math.max(this.allPublisher.length - 5, 1));
  }

  authorDetails(id: any) {
    this.router.navigate(['/store/authorBook', id])
  }

  categoryDetails(id: any) {
    this.router.navigate(['/store/categoryBook', id])
  }

  publisherDetails(id: any) {
    this.router.navigate(['/store/publisherBook', id])
  }
}
