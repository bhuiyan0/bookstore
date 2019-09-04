import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthorWiseBookComponent } from './pages/author-wise-book/author-wise-book.component';
import { CategoryWiseBookComponent } from './pages/category-wise-book/category-wise-book.component';
import { PublisherWiseBookComponent } from './pages/publisher-wise-book/publisher-wise-book.component';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { PublisherListComponent } from './pages/publisher-list/publisher-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import {AuthGuard} from './auth/auth.store.guard';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'details/:id', component: ProductDetailsComponent }, 
      { path: 'cart', component: CartComponent, canActivate:[AuthGuard] }, 
      { path: 'wishlist', component: WishlistComponent,canActivate:[AuthGuard] }, 
      { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard] }, 
      { path: 'feedback', component: FeedbackComponent }, 
      { path: 'aboutus', component: AboutUsComponent }, 
      { path: 'profile', component: ProfileComponent ,canActivate:[AuthGuard]}, 
      { path: 'authorBook/:authorId', component: AuthorWiseBookComponent }, 
      { path: 'categoryBook/:categoryId', component: CategoryWiseBookComponent }, 
      { path: 'publisherBook/:publisherId', component: PublisherWiseBookComponent }, 
      { path: 'authorList', component: AuthorListComponent },
      { path: 'categoryList', component: CategoryListComponent },
      { path: 'publisherList', component: PublisherListComponent }, 
      { path: 'myOrders', component: MyOrdersComponent,canActivate:[AuthGuard] }, 
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
