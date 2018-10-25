import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from '../article.model';
import { ArticlesService } from '../articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {


  constructor(public articlesService: ArticlesService, private router: Router) { }

  ngOnInit() {
  }

  onAddArticle(form: NgForm) {
    if (form.invalid) {
      console.log('formulaire d\'ajout d\'un article invalide');
      // test a faire
      return;
    }
    /*
    const article: Article = {
      title: form.value.title ,
      content: form.value.content
    };
    */
    this.articlesService.addArticle(form.value.title, form.value.content );
    console.log('ajout d\'un article effectué');
    this.router.navigate(['/', 'articleList']);
  }
}
