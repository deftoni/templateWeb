import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../../../services/articles/articles.service';
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
    console.log(form.value);
    this.articlesService.addArticle(form.value.title, form.value.content);

    // test si l'ajout a etait effectué
    this.router.navigate(['/', 'articleList']);
  }
}
