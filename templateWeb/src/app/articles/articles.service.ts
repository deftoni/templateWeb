import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  private articles: Article[] = [];
  private articlesUpdated = new Subject<Article[]>();

  constructor(private http: HttpClient) { }

  getArticles() {

    this.http
    .get<{ message: string, articles: any }>(
      'http://localhost:3000/api/articles'
    )
    .pipe(map((articleData) => {
      return articleData.articles.map((article) => {
        return {
          id: article._id ,
          title: article.title,
          content: article.content
        };
      });
    }))
    .subscribe(
      (articleTransformed) => {
        this.articles = articleTransformed,
        console.log('GET Article', this.articles),
        this.articlesUpdated.next([...this.articles]);
      },
      () => { console.log('error'); },
      () => { }
    );
  }

  getArticlesUpdateListener() {
    return this.articlesUpdated.asObservable();
  }

  addArticle(title: string, content: string ) {
    const article: Article = {id: null, title: title, content: content};
    this.http.post<{ message: string, articleId: string }>('http://localhost:3000/api/articles', article)
    .subscribe(
      (responseData) => {
      console.log('msg', responseData.message);
      article.id = responseData.articleId;
      this.articles.push(article);
      this.articlesUpdated.next([...this.articles]);
      }
    );
  }

  deleteArticle(articleId: string) {
    this.http.delete('http://localhost:3000/api/articles/' + articleId)
    .subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== articleId);
      this.articlesUpdated.next([...this.articles]);
    });
  }
}
