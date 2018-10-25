import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';

import { ARTICLES } from './mock-articles';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  // private articles: Article[] = ARTICLES;
  private articles: Article[];

  constructor(private http: HttpClient) { }


  getArticlesObserver() {

    return this.http
    .get<{ message: string, articles: Article[] }>(
      'http://localhost:3000/api/articles'
    );
  }

  addArticle(title: string, content: string ) {
    const article: Article = {id: null, title: title, content: content};
    this.articles.push(article);
  }
}
