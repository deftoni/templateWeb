import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/blog/home/home.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleCreateComponent } from './components/articles/article-create/article-create.component';
import { ServicesListComponent } from './components/blog/services-list/services-list.component';
import { PortfolioComponent } from './components/blog/portfolio/portfolio.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { FooterComponent } from './components/blog/footer/footer.component';
import { SearchBarComponent } from './components/articles/search-bar/search-bar.component';
import { LinkListComponent } from './components/navigation/link-list/link-list/link-list.component';
import { LinkItemsComponent } from './components/navigation/link-list/link-items/link-items.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteButtonComponent } from './components/articles/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './components/articles/buttons/add-button/add-button.component';
import { ArticleUpdateComponent } from './components/articles/article-update-modal-content/article-update-modal-content.component';
import { UpdateButtonComponent } from './components/articles/buttons/update-button/update-button.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthIntercepter } from './services/auth/auth-intercepter';
import { ErrorIntercepter } from './services/error/error-interceptor';
import { ArticleDetailsComponent } from './components/articles/article-details/article-details.component';
// tslint:disable-next-line:max-line-length
import { GetArticleDetailsButtonComponent } from './components/articles/buttons/get-article-details-button/get-article-details-button.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CropperComponent } from 'angular-cropperjs';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListComponent,
    ArticleCreateComponent,
    ServicesListComponent,
    PortfolioComponent,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    LinkListComponent,
    LinkItemsComponent,
    ArticleComponent,
    ArticleUpdateComponent,
    DeleteButtonComponent,
    AddButtonComponent,
    UpdateButtonComponent,
    LoginComponent,
    SignupComponent,
    ArticleDetailsComponent,
    GetArticleDetailsButtonComponent,
    CropperComponent,
  ],
  entryComponents: [
    ArticleUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PaginatorModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorIntercepter, multi: true},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
