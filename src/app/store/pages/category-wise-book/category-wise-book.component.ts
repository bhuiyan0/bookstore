import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookViewModel } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-category-wise-book',
  templateUrl: './category-wise-book.component.html',
  styleUrls: ['./category-wise-book.component.css']
})
export class CategoryWiseBookComponent implements OnInit {

  books: Observable<BookViewModel[]>;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadCategoryWiseBook();
    this.viewDetails();

    const token=this.authService.getToken();
    if(isNullOrUndefined(token)){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
  }

  loadCategoryWiseBook() {
    this.route.paramMap.subscribe(res => {
      const categoryId = +res.get('categoryId');
      this.books = this.bookService.getBookByCategoryId(categoryId);
    })
  }
  details(id: any) {
    this.router.navigate(['/store/details', id])
  }
  viewDetails() {
    this.route.paramMap.subscribe(res => {
      const categoryId = +res.get('categoryId');
      this.categoryService.getById(categoryId).subscribe(res => {
        document.getElementById('categoryName').innerHTML = res.categoryName;
      });
    });
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
