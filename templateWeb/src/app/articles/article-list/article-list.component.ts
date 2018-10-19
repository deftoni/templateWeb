import { Component, OnInit } from '@angular/core';
import { Article } from '../article.model';
import { ArticlesService } from '../articles.service';
import { ARTICLES } from "../mock-articles"

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles = ARTICLES;
  
  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {
    this.articles = this.articlesService.getArticles();
  }

}
