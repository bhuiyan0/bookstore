import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: {};
  cartlistCount: number;
  cartTotal: number;
  editMode: boolean;
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadCart();
    const userId = this.authService.getUserId();
    this.cartService.cartTotal(userId).subscribe(res => {
      this.cartTotal = res;
    });
  }
ngDoCheck(): void {
  const userId = this.authService.getUserId();
  this.cartService.cartTotal(userId).subscribe(res => {
    this.cartTotal = res;
  });
}

  loadCart() {
    this.cartlistCount = 0;
    const userId = this.authService.getUserId();
    this.cartService.getByUser(userId).subscribe(res => {
      this.cart = res;
      if (Array.isArray(res)) {
        this.cartlistCount = res.length;
      }
    });
  }

  remove(id: number) {
    this.cartService.delete(id).subscribe(res => {
      this.loadCart();
    });
  }
  editModeOn() {
    this.editMode = true;
  }


}
