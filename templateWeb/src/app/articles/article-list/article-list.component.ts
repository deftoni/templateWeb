import { Component, OnInit } from '@angular/core';
import { Article } from '../article.model';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public articles: Article[] = [];

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {

    this.articlesService.getArticlesObserver().subscribe(
      (articleData) => { console.log('next', articleData); this.articles = articleData.articles; },
      () => { console.log('error'); },
      () => { console.log('complete'); }
    );

  }

}
