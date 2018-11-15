import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/articles/article.model';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Subscription } from 'rxjs';
import { ARTICLES } from 'src/app/models/articles/mock-articles';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  myArticleToDisplay: Article;
  articleId: string;
  private sub: any;
  private articleSub: Subscription;

  constructor(private route: ActivatedRoute, public articlesService: ArticlesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.articleId = params.articleId;
      console.log('my articleId: ', this.articleId);
    });

    this.articlesService.getArticleById(this.articleId);
    this.articleSub = this.articlesService.getArticleDetailsListener().subscribe();
    console.log( 'my article to display from component: ', this.articleSub);
  }

}
