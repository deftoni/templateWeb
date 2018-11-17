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
  imgGotAnImg: Boolean = false;
  imgPreview;


  ngOnInit() {
  }

  onAddArticle(form: NgForm) {
    if (form.invalid) {
      console.log('formulaire d\'ajout d\'un article invalide');
      // test a faire
      return;
    }
    const uploadData = new FormData();

    uploadData.append('title', form.value.title);
    uploadData.append('content', form.value.content);
    if (this.imgGotAnImg === true) {
      console.log('I have an img: ', this.articleImg);
      uploadData.append('myFile', this.articleImg, this.articleImg.name);
    } else {
      console.log('no img: ', this.articleImg);
    }


    this.articlesService.addArticle(uploadData);

    // test si l'ajout a etait effectué
    this.router.navigate(['/', 'articleList']);
  }

  onGetFiles(event: Event) {
    this.articleImg = (event.target as HTMLInputElement).files[0];
    this.imgName = (event.target as HTMLInputElement).files[0].name;
    this.imgGotAnImg = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
    reader.readAsDataURL(this.articleImg);
  }

}
