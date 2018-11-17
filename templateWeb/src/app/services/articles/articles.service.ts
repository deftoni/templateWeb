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
  private articlesUpdated = new Subject<{articles: Article[], countArticle: number}>();
  private articleUpdated = new Subject<Article>();
  private articleDetails: Article;
  private totalArticle: number;
  private articlesPerPage: number;
  private currentPage: number;

  private config = new Config();

  constructor(private http: HttpClient) { }

  getArticles(articlesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${articlesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, articles: any, maxArticles: number }>(
        `${this.config.getArticleUrl()}` + queryParams
      )
      .pipe(
        map((articleData) => {
          return {
            article: articleData.articles.map((article) => {
              return {
                id: article._id,
                title: article.title,
                content: article.content,
                img_irl: article.img_irl
              };
            }),
            maxArticles: articleData.maxArticles
          };
        })
      )
      .subscribe(
        (transformedArticleData) => {
          this.articles = transformedArticleData.article,
          this.totalArticle = transformedArticleData.maxArticles,
          console.log('GET Article', transformedArticleData),
          this.articlesUpdated.next({articles: [...this.articles], countArticle: transformedArticleData.maxArticles });
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

  addArticle( newArticle: FormData) {

    const article: Article = {
      id: null, title: newArticle.get('title').toString(),
      content: newArticle.get('content').toString(),
      img_irl: null
    };

    this.http.post<{ message: string, articleId: string, articleImgPath: string}>(`${this.config.getArticleUrl()}`, newArticle)
      .subscribe(
        (responseData) => {
          article.id = responseData.articleId;
          article.img_irl = responseData.articleImgPath;
          this.articles.push(article);
          this.totalArticle++;
          this.articlesUpdated.next({articles: [...this.articles], countArticle: (this.totalArticle)});
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
      this.getArticles(this.articlesPerPage, this.currentPage);
    });
      /*.subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== articleId);
      this.totalArticle--;
      this.articlesUpdated.next({articles: [...this.articles], countArticle: (this.totalArticle)});
    });*/
  }
  updatePageData(articlesPerPage: number, currentPage: number) {
    this.articlesPerPage = articlesPerPage;
    this.currentPage = currentPage;
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

          this.articlesUpdated.next({articles: [...this.articles], countArticle: (this.totalArticle)});
        }
      );
  }

}
