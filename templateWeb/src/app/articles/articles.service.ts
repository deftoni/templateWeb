import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { Subject } from 'rxjs';

import { ARTICLES } from './mock-articles';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  private articles: Article[] = ARTICLES;
  private articlesUpdated = new Subject<Article[]>();
  constructor() { }

  getArticles() {
    return [...this.articles];
  }

  getArticlesUpdateListener() {
    return this.articlesUpdated.asObservable();
  }

  addArticle( article: Article ) {
    this.articles.push(article);
    this.articlesUpdated.next([...this.articles]);
  }
}
