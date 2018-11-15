import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleCreateComponent } from './components/articles/article-create/article-create.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LinkListComponent } from './components/link-list/link-list/link-list.component';
import { LinkItemsComponent } from './components/link-list/link-items/link-items.component';
import { ArticleComponent } from './components/articles/article/article.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DeleteButtonComponent } from './components/articles/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './components/articles/buttons/add-button/add-button.component';
import { NgbdModalContentComponent } from './components/articles/article-update-modal-content/article-update-modal-content.component';
import { NgbdModalComponent } from './components/articles/buttons/update-button/update-button.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthIntercepter } from './services/auth/auth-intercepter';
import { ArticleDetailsComponent } from './components/articles/article-details/article-details.component';
// tslint:disable-next-line:max-line-length
import { GetArticleDetailsButtonComponent } from './components/articles/buttons/get-article-details-button/get-article-details-button.component';

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
    NgbdModalContentComponent,
    DeleteButtonComponent,
    AddButtonComponent,
    NgbdModalComponent,
    LoginComponent,
    SignupComponent,
    ArticleDetailsComponent,
    GetArticleDetailsButtonComponent
  ],
  entryComponents: [NgbdModalContentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
