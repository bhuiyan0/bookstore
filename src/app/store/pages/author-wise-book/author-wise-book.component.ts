import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { BookViewModel } from 'src/app/model/book';
import { PublisherService } from 'src/app/services/publisher.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-author-wise-book',
  templateUrl: './author-wise-book.component.html',
  styleUrls: ['./author-wise-book.component.css',]
})
export class AuthorWiseBookComponent implements OnInit {

  books: Observable<BookViewModel[]>;
  authors: any;
  publishers: any;
  categories: Observable<Category[]>;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private authorService: AuthorService,
    private bookService: BookService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService:AuthService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.viewDetails();
    this.loadAuthorWiseBook();

    const token=this.authService.getToken();
    if(isNullOrUndefined(token)){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
  }

  loadAuthorWiseBook() {
    this.route.paramMap.subscribe(res => {
      const authorId = +res.get('authorId');
      this.books = this.bookService.getBookByAuthorId(authorId);
    })
  }

  viewDetails() {
    this.route.paramMap.subscribe(res => {
      const authorId = +res.get('authorId');
      this.authorService.getById(authorId).subscribe(res => {
        document.getElementById('authorName').innerHTML = res.authorName;
        document.getElementById('authorDetails').innerHTML = res.authorInfo;
      })
    })
  }

  details(id: any) {
    this.router.navigate(['/store/details', id])
  }

  loadCatAuthPub() {
    this.authors = this.authorService.getActiveAuthors();
    this.publishers = this.publisherService.getAllPublishers();
    this.categories = this.categoryService.getAllCategory();
  }

  load() {
    this.books = this.bookService.getAllBooks();
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
