import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-get-article-details-button',
  templateUrl: './get-article-details-button.component.html',
  styleUrls: ['./get-article-details-button.component.css']
})
export class GetArticleDetailsButtonComponent implements OnInit {

  @Input() articleId;

  constructor() { }

  ngOnInit() {
  }
}
