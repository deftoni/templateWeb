import { Injectable } from '@angular/core';
import { Article } from './article.model';

import { ARTICLES } from './mock-articles';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  private articles: Article[] = ARTICLES;
  constructor() { }

  getArticles() {
    return [...this.articles];
  }

  addArticle( article: Article ) {
    this.articles.push(article);
  }
}
