import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadJsService } from '../services/load-js.service';
import { StoreComponent } from './store.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Components
import { MatCheckboxModule } from '@angular/material';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreRoutingModule } from './store-routing.module';
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
import { from } from 'rxjs';
import { AuthGuard} from './auth/auth.store.guard';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    StoreComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    FeedbackComponent,
    AboutUsComponent,
    ProfileComponent,
    AuthorWiseBookComponent,
    CategoryWiseBookComponent,
    PublisherWiseBookComponent,
    AuthorListComponent,
    CategoryListComponent,
    PublisherListComponent,
    WishlistComponent,
    MyOrdersComponent,
    ModalDialogComponent
  ],
  providers: [
    LoadJsService,
  AuthGuard
  ],
  entryComponents:[ModalDialogComponent]
})
export class StoreModule { }
