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

  public articles: Article[] = [];
  private articlesSub: Subscription;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {

    // recuperation des articles
      this.articlesService.getArticles();

    // verification de l'ajout d'articles
    this.articlesSub = this.articlesService.getArticlesUpdateListener().subscribe(
      (articles: Article[]) => {
        console.log('UPDATE Articles', articles),
        this.articles = articles; }
      );
  }

  onDelete(articleId: string) {
    this.articlesService.deleteArticle(articleId);
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }
}
