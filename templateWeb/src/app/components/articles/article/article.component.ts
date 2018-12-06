import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Article} from '../../../models/articles/article.model';

import { ArticlesService } from '../../../services/articles/articles.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit, OnDestroy {

  clickInfo = 'default';



  @Input() article: Article;

  private authListenerSub: Subscription;
  userIsAuthenticated = false;
  constructor(public articlesService: ArticlesService, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    },
    (error: Error) => { console.log(error); },
    () => { });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  onClickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default'; },
      3000);
  }

}
