import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';

// import { ARTICLES } from './mock-articles';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  // private articles: Article[] = ARTICLES;
  private articlesUpdated = new Subject<Article>();

  constructor(private http: HttpClient) { }

  getArticlesObserver() {

    return this.http
    .get<{ message: string, articles: Article[] }>(
      'http://localhost:3000/api/articles'
    );
  }

  getArticlesUpdateListener() {
    return this.articlesUpdated.asObservable();
  }

  addArticle(title: string, content: string ) {
    const article: Article = {id: null, title: title, content: content};
    this.http.post<{ message: string }>('http://localhost:3000/api/articles', article)
    .subscribe((responseData) => {
      console.log('msg', responseData.message);
      this.articlesUpdated.next(article);
    });
  }
}
