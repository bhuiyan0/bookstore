import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { LoadJsService } from '../../../services/load-js.service';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { BookViewModel } from 'src/app/model/book';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { isNullOrUndefined } from 'util';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../assets/dist/css/pages/ecommerce.css'],
  providers: [AppGlobals]
})

export class HomeComponent implements OnInit {

  books: Observable<BookViewModel[]>;
  allBooks: any[];
  isLoggedIn = false;

  p = 1;
  row =20;

  constructor(
    private jsService: LoadJsService,
    private router: Router,
    private bookService: BookService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.LoadScripts();
    this.load();

    const token = this.authService.getToken();
    if (isNullOrUndefined(token)) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  LoadScripts() {
    this.jsService.load('slider');
  }

  load() {
    this.bookService.getAllBooks().subscribe(res => {
      this.allBooks = res;
    });
  }

  details(id: any) {
    this.router.navigate(['/store/details', id])
  }

  addToWishlist(bId: number) {
    const uId = this.authService.getUserId();
    this.wishlistService.create(uId, bId).subscribe(res => {
    }, err => console.log());
  }

  addToCart(bId: number) {
    const uId = this.authService.getUserId();
    this.cartService.create(uId, bId).subscribe(res => {
    }, err => console.log(err));
  }


  openDialog(): void {
    this.dialog.open(ModalDialogComponent, {
      width: '250px',
      // disableClose: true,
    });
  }

}


