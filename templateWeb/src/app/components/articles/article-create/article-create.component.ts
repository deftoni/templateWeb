import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  constructor(public articlesService: ArticlesService, private router: Router, private messageService: MessageService) { }

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
    }


    this.articlesService.addArticle(uploadData);

    // test si l'ajout a etait effectué
    this.router.navigate(['/', 'articleList']);
  }

  onGetFiles(event: Event) {
    if ((event.target as HTMLInputElement).files[0].size > 15000000) {

      this.messageService.add({
        key: 'SizeTooBig', severity: 'error',
        summary: 'Wrong image', detail: 'Damn Mush your image is too big, its ok try again ', life: 5000
      });

    } else {
      if ((event.target as HTMLInputElement).files[0].type !== 'image/jpeg'
        && (event.target as HTMLInputElement).files[0].type !== 'image/jpg'
        && (event.target as HTMLInputElement).files[0].type !== 'image/png') {

        this.messageService.add({
          key: 'wrongExtension', severity: 'error',
          summary: 'Wrong image', detail: 'Damn Mush your image has not the good extension, its ok try again',
          life: 5000
        });

      } else {

        this.articleImg = (event.target as HTMLInputElement).files[0];
        this.imgName = (event.target as HTMLInputElement).files[0].name;
        this.imgGotAnImg = true;

        // preview de l'image

        const reader = new FileReader();
        reader.onload = () => {
          this.imgPreview = reader.result;
        };
        reader.readAsDataURL(this.articleImg);

      }
    }
  }
}
