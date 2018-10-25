import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../article.model';
import { ArticlesService } from '../articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  public articles: Article[] = [];
  private articlesSub: Subscription;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {

    // recuperation des articles
    this.articlesService.getArticlesObserver().subscribe(
      (articleData) => { console.log('next', articleData), this.articles = articleData.articles; },
      () => { console.log('error'); },
      () => { console.log('complete'); }
    );

    // verification d'ajout d'articles
    this.articlesSub = this.articlesService.getArticlesUpdateListener().subscribe(
      (article: Article) => { this.articles.push(article); },
      );
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }
}
