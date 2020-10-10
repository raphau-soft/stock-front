import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SellOffersComponent } from './sell-offers/sell-offers.component';
import { BuyOffersComponent } from './buy-offers/buy-offers.component';
import { ResourcesComponent } from './resources/resources.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompaniesComponent } from './companies/companies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    SellOffersComponent,
    BuyOffersComponent,
    ResourcesComponent,
    CompaniesComponent,
    TransactionsComponent,
    TestComponent
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
