import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  config = [];
  imageUrl;
  resultImage: any;
  resultResult: any;
  myBlob;
  articleImg: File;
  imgName: String = null;
  imgGotAnImg: Boolean = false;
  iGotCropped: Boolean = false;
  IGotAnUrl: Boolean = false;


  constructor(public articlesService: ArticlesService, private router: Router,
    private messageService: MessageService, private sanitizer: DomSanitizer) { }


  ngOnInit() {
  }

  CropMe() {
    this.iGotCropped = true;
    this.resultResult = this.angularCropper.imageUrl;
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas();
    this.resultImage.toBlob((blob) => { this.myBlob = blob; });
    this.angularCropper.exportCanvas();
  }

  resultImageFun(event: ImageCropperResult) {
    const urlCreator = window.URL;
    this.resultResult = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  checkstatus(event: any) {
    console.log(event.blob);
    if (event.blob === undefined) {
      return;
    }
    // this.resultResult = event.blob;
    const urlCreator = window.URL;
    this.resultResult = this.sanitizer.bypassSecurityTrustUrl(
      urlCreator.createObjectURL(new Blob(event.blob)));
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

    if (this.myBlob == null) {
      uploadData.append('myFile', this.articleImg, this.articleImg.name);
    } else {
      uploadData.append('myFile', this.myBlob, this.articleImg.name);
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

        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl = reader.result;
        };

        reader.readAsDataURL(this.articleImg);
        this.IGotAnUrl = true;
      }
    }
  }
}
