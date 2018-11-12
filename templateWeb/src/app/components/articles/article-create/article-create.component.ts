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

  articleImg: File;
  imgName: String = null;
  imgGotAName: Boolean = false;

  ngOnInit() {
  }

  onAddArticle(form: NgForm) {
    if (form.invalid) {
      console.log('formulaire d\'ajout d\'un article invalide');
      // test a faire
      return;
    }
    console.log('img de mon article: ', this.articleImg);

    const uploadData = new FormData();
    uploadData.append('myFile', this.articleImg, this.articleImg.name);
    this.articlesService.addImgArticleToFtp(uploadData);

    const img_irl: string = '/server/ressources/article/img/' + this.articleImg.name;
    this.articlesService.addArticle(form.value.title, form.value.content, img_irl);

    // test si l'ajout a etait effectué
    this.router.navigate(['/', 'articleList']);
  }

  getFiles(event) {
    console.log('event img', event.target.files[0]);
    this.articleImg = event.target.files[0];
    this.imgName = event.target.files[0].name;
    this.imgGotAName = true;
  }

}
