import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/articles/article.model';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  public articles: Article[] = [];
  private articlesSub: Subscription;
  public articleToUpdate: Article;
  private authListenerSub: Subscription;
  userIsAuthenticated = false;

  public totalArticles = 0;
  public articlesPerPage = 2;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];

  constructor(public articlesService: ArticlesService, private authService: AuthService) { }

  ngOnInit() {

    // recuperation des articles
    this.articlesService.getArticles(this.articlesPerPage, this.currentPage);

    // verification de l'ajout d'articles
    this.articlesSub = this.articlesService.getArticlesUpdateListener().subscribe(
      (articlesData: {articles: Article[], countArticle: number}) => {
        console.log('UPDATE Articles', articlesData),
        this.articles = articlesData.articles;
        this.totalArticles = articlesData.countArticle;
      }
    );
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onUpdateArticle(form: NgForm) {
    if (form.invalid) {
      console.log('formulaire de modification d\'un article invalide');
      // test a faire
      return;
    }
    console.log(form.value);
    this.articlesService.updateArticle(form.value);
  }
  onChangedPage(pageData) {
    console.log(pageData);
    this.currentPage = pageData.page + 1;
    this.articlesPerPage = pageData.rows;
    this.articlesService.getArticles(this.articlesPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

}
