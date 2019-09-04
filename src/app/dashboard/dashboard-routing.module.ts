import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './login/login.component';
import { RoleComponent } from './pages/role/role.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { BookComponent } from './pages/book/book.component';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PurchaseCreateComponent } from './pages/purchase/purchase-create/purchase-create.component';
import { OrderComponent } from './pages/order/order.component';
import { CategoryListResolverService } from '../route-resolver/category-list-resolver.service';
import { AuthGuard } from './auth/auth.guard';
// import { PurchaseTestComponent } from './pages/purchasetest/purchase.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent , canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
      { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
      {
        path: 'category',
        component: CategoryComponent,
         canActivate: [AuthGuard]
        // resolve: { categoryList: CategoryListResolverService }
      },
      { path: 'author', component: AuthorComponent, canActivate: [AuthGuard] },
      { path: 'publisher', component: PublisherComponent, canActivate: [AuthGuard] },
      { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
      { path: 'create-book', component: BookCreateComponent , canActivate: [AuthGuard]},
      { path: 'edit-book/:id', component: BookCreateComponent, canActivate: [AuthGuard] },
      { path: 'purchase-list', component: PurchaseComponent , canActivate: [AuthGuard]},
      { path: 'purchase-create', component: PurchaseCreateComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrderComponent , canActivate: [AuthGuard]},
      // { path: 'test', component: PurchaseTestComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
