import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/articles/article.model';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  public articles: Article[] = [];
  private articlesSub: Subscription;
  public articleToUpdate: Article;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {

    // recuperation des articles
    this.articlesService.getArticles();

    // verification de l'ajout d'articles
    this.articlesSub = this.articlesService.getArticlesUpdateListener().subscribe(
      (articles: Article[]) => {
        console.log('UPDATE Articles', articles),
          this.articles = articles;
      }
    );
  }

  onDelete(articleId: string) {
    this.articlesService.deleteArticle(articleId);
  }

  setArticleToUpdateArticle(articleIdToUpdate: string) {
    for (const article of this.articles) {
      if (article.id === articleIdToUpdate) {
        this.articleToUpdate = article;
      }
    }
  }

  onUpdateArticle(form: NgForm) {
    if (form.invalid) {
      console.log('formulaire de modification d\'un article invalide');
      // test a faire
      return;
    }
    console.log(form.value);
    this.articlesService.updateArticle(form.value);
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }

}
