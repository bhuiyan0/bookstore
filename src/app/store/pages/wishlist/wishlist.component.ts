import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from 'src/app/model/wishlist';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlists: {} | string;
  wishlistCount: number;
  constructor(
    private wishlistService: WishlistService,
    private authService:AuthService,
    private cartService:CartService
  ) { }

  ngOnInit() {

    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistCount = 0;
     const userId = this.authService.getUserId();
    this.wishlistService.getByUser(userId).subscribe(res => {
      if (Array.isArray(res)) {
        this.wishlistCount = res.length;
        this.wishlists = res;
      } else{
        this.wishlists = null;
      }
    });
  }

  remove(id: number) {
    this.wishlistService.delete(id).subscribe(res => {
      this.loadWishlist();
    });
  }
  addToCart(id: number) {
    const userId = this.authService.getUserId();
    this.cartService.create(userId, id).subscribe(res => {
    }, err => console.log(err));
  }
}
