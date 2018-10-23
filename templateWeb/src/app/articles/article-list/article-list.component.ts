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

  articles: Article[];
  private articlesSub: Subscription;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {
    this.articles = this.articlesService.getArticles();
    this.articlesSub = this.articlesService.getArticlesUpdateListener()
      .subscribe( (articles: Article[]) => {
        this.articles = articles;
      });
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }
}
