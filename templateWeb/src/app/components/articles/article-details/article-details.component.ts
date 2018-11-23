import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Article } from '../../../models/articles/article.model';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  public myArticleToDisplay: Article;
  articleId: string;
  private routeSub: Subscription;
  private articleSub: Subscription;

  constructor(private route: ActivatedRoute, public articlesService: ArticlesService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.articleId = params.articleId;
    });

    this.articlesService.getArticleById(this.articleId);
    this.articleSub = this.articlesService.getArticleDetailsListener().subscribe((article: Article) => {
      this.myArticleToDisplay = article;
    });
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
