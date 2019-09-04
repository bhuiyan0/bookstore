import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookViewModel } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublisherService } from 'src/app/services/publisher.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-publisher-wise-book',
  templateUrl: './publisher-wise-book.component.html',
  styleUrls: ['./publisher-wise-book.component.css']
})
export class PublisherWiseBookComponent implements OnInit {

  books: Observable<BookViewModel[]>;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private publisherService: PublisherService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService:AuthService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.loadPublisherWiseBook();
    this.viewDetails();
    
    const token=this.authService.getToken();
    if(isNullOrUndefined(token)){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
  }

  loadPublisherWiseBook() {
    this.route.paramMap.subscribe(res => {
      const publisherId = +res.get('publisherId');
      this.books = this.bookService.getBookByAuthorId(publisherId);
    });
  }

  viewDetails() {
    this.route.paramMap.subscribe(res => {
      const publisherId = +res.get('publisherId');
      this.publisherService.getById(publisherId).subscribe(res => {
        document.getElementById('publisherName').innerHTML = res.publisherName;
      });
    });
  }

  details(id: any) {
    this.router.navigate(['/store/details', id]);
  }

  addToWishlist(id: number) {
    const userId = this.authService.getUserId();
    this.wishlistService.create(userId, id).subscribe(res => {
    }, err => console.log(err));
  }

  addToCart(id: number) {
    const userId = this.authService.getUserId();
    this.cartService.create(userId, id).subscribe(res => {
    }, err => console.log(err));
  }

  openDialog(): void {
    this.dialog.open(ModalDialogComponent, {
      width: '250px',
      // disableClose: true,
    });
  }

}
