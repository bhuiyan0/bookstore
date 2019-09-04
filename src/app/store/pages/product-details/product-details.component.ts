import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { error } from '@angular/compiler/src/util';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { BookReviewService } from 'src/app/services/book-review.service';
import { ThrowStmt } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currnetBookId = null;

  bookInfo = {
    bookName: null,
    authorName: null,
    publisherName: null,
    categoryName: null,
    edition: null,
    isbn: null,
    numberOfPage: null,
    language: null,
    sellingPrice: null,
    description: null
  }

  reviews: {}
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService: AuthService,
    private bookReviewService: BookReviewService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.viewBookDetails();
    this.loadReview();
    this.createForm();
  }

  // ngDoCheck() {
  //   this.loadReview();
  // }

  createForm() {
    const uId = this.authService.getUserId();
    this.reviewForm = this.formBuilder.group({
      bookId: [this.currnetBookId, Validators.required],
      userId: [uId, Validators.required],
      reviewDate: [new Date, Validators.required],
      comments: ['', [Validators.required, Validators.maxLength(300)]],
    })
  }

  viewBookDetails() {
    this.route.paramMap.subscribe(res => {
      this.currnetBookId = +res.get('id');
      this.bookService.getById(this.currnetBookId).subscribe(res => {
        this.bookInfo.bookName = res.bookName;
        this.bookInfo.authorName = res.authorName;
        this.bookInfo.publisherName = res.publisherName;
        this.bookInfo.categoryName = res.categoryName;
        this.bookInfo.edition = res.edition;
        this.bookInfo.isbn = res.isbn;
        this.bookInfo.numberOfPage = res.numberOfPage.toString();
        this.bookInfo.language = res.language;
        this.bookInfo.sellingPrice = res.sellingPrice;
        this.bookInfo.description = res.descriptions;
      });
    }, (e) => { console.log(e) });
  }

  addToWishlist() {
    const userId = this.authService.getUserId();
    this.wishlistService.create(userId, this.currnetBookId).subscribe(res => {
    }, err => console.log(err));
  }

  addToCart() {
    const userId = this.authService.getUserId();
    this.cartService.create(userId, this.currnetBookId).subscribe(res => {
    }, err => console.log(err));
  }

  loadReview() {
    this.bookReviewService.getByBookId(this.currnetBookId).subscribe(res => {
      this.reviews = res;
    })
  }

  submit() {
    if (this.reviewForm.invalid) {
      return;
    }
    this.bookReviewService.create(this.reviewForm.value).subscribe(res => {
      this.reviewForm.reset();
      this.loadReview();
    }, err => console.log(err))
  }
}
