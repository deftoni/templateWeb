import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { LinkListComponent } from './components/navbar/link-list/link-list/link-list.component';
import { LinkItemsComponent } from './components/navbar/link-list/link-items/link-items.component';
import { ArticleComponent } from './components/articles/article/article.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DeleteButtonComponent } from './components/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './components/buttons/add-button/add-button.component';
import { NgbdModalContentComponent } from './components/articles/update-article-modal-content/update-article-modal-content.component';
import { NgbdModalComponent } from './components/buttons/update-button/update-button.component';

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
    NgbdModalComponent
  ],
  entryComponents: [NgbdModalContentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
