import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './dashboard/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
