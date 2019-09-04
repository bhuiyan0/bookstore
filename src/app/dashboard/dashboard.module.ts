import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoadJsService } from '../services/load-js.service';
import { CategoryService } from '../services/category.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './dashboard.component';
import { RoleComponent } from './pages/role/role.component';
import { CategoryComponent } from './pages/category/category.component';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorComponent } from './pages/author/author.component';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { BookComponent } from './pages/book/book.component';
import { CustomFilterPipe } from '../pipe/custom-filter.pipe';
import { from } from 'rxjs';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';

// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material';
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
import { ProfileComponent } from './pages/profile/profile.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PurchaseCreateComponent } from './pages/purchase/purchase-create/purchase-create.component';
import { OrderComponent } from './pages/order/order.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CategoryListResolverService } from '../route-resolver/category-list-resolver.service';
 // import { PurchaseTestComponent } from './pages/purchasetest/purchase.component';
import { PurchaseService } from '../services/purchase.service';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
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

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    RoleComponent,
    CategoryComponent,
    AuthorComponent,
    PublisherComponent,
    BookComponent,
    CustomFilterPipe,
    BookCreateComponent,
    ProfileComponent,
    PurchaseComponent,
    PurchaseCreateComponent,
    OrderComponent,
    FeedbackComponent,

    // PurchaseTestComponent
  ],
  providers: [
    LoadJsService,
    CategoryService,
    CategoryListResolverService,
    PurchaseService
  ]
})
export class DashboardModule { }
