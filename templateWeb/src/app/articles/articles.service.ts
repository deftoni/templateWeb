import { Injectable } from '@angular/core';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  private articles: Article[] = [];

  constructor() { }

  getArticles() {
    return this.articles;
  }

  addArticle( article: Article ) {
    this.articles.push(article);
  }
}
