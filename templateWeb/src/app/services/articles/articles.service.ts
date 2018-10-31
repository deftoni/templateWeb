import { Injectable } from '@angular/core';
import { Article } from '../../models/articles/article.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from '../../config/config';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  private articles: Article[] = [];
  private articlesUpdated = new Subject<Article[]>();

  private config = new Config();

  constructor(private http: HttpClient) { }

  getArticles() {

    this.http
      .get<{ message: string, articles: any }>(
        `${this.config.getArticleUrl()}`
      )
      .pipe(map((articleData) => {
        return articleData.articles.map((article) => {
          return {
            id: article._id,
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

  addArticle(title: string, content: string) {
    const article: Article = { id: null, title: title, content: content };
    this.http.post<{ message: string, articleId: string }>(`${this.config.getArticleUrl()}`, article)
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
    this.http.delete(`${this.config.getArticleUrl()}` + articleId)
      .subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.articlesUpdated.next([...this.articles]);
      });
  }

  updateArticle(articleToUpdate: Article) {
    this.http.put<{ message: string, articleId: string }>(`${this.config.getArticleUrl()}${articleToUpdate.id}`, articleToUpdate)
      .subscribe(
        (responseData) => {
          console.log('msg', responseData.message);
          console.log('le nouvel article', articleToUpdate);
          console.log('le tableau d article', this.articles);

          this.articles.find(({ id }) => id === responseData.articleId).title = articleToUpdate.title;
          this.articles.find(({ id }) => id === responseData.articleId).content = articleToUpdate.content;

          this.articlesUpdated.next([...this.articles]);
        }
      );
  }

}