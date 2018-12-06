import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../../../../services/articles/articles.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  @Input() articleId;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit() {
  }

  onDelete() {
    this.articlesService.deleteArticle(this.articleId);

  }

}
