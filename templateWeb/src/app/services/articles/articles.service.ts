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
  private articleUpdated = new Subject<Article>();
  private articleDetails: Article;

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
            content: article.content,
            img_irl: article.img_irl
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

  getArticleById(articleId: string) {
    this.http.get<{ message: string, article: Article }>(
      `${this.config.getArticleUrl()}` + articleId
    ).subscribe(reponseData => {
     this.articleDetails = reponseData.article;
     console.log('GET ArticleByID: ', this.articleDetails);
     this.articleUpdated.next(this.articleDetails);
    });
  }

  getArticleDetailsListener() {
    return this.articleUpdated.asObservable();
  }

  addArticle(title: string, content: string, img_irl: string) {
    const article: Article = { id: null, title: title, content: content, img_irl: img_irl };
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

  addImgArticleToFtp(img: any) {
    console.log('this is my img I want to send to the server: ', img);
    this.http.post<{ message: string}>(`${this.config.getArticleUrl()}` + 'upload', img, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
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
          this.articles.find(({ id }) => id === responseData.articleId).img_irl = articleToUpdate.img_irl;

          this.articlesUpdated.next([...this.articles]);
        }
      );
  }

}
