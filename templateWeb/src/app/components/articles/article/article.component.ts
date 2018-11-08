import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../../../models/articles/article.model';

import { ArticlesService } from '../../../services/articles/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {
  }

}
