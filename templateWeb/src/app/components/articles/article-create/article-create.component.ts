import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../../../services/articles/articles.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  croppeOptions = [];
  imageUrl = null;
  resultImage: any;
  resultCroppedImg: any;
  myBlob;
  articleImg: File;
  imgName: String = null;
  imgGotAnImg: Boolean = false;
  iGotCropped: Boolean = false;
  IGotAnUrl: Boolean = false;

  constructor(
    public articlesService: ArticlesService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  CropMe() {
    this.iGotCropped = true;
    this.resultCroppedImg = this.angularCropper.imageUrl;
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas();
    this.resultImage.toBlob((blob) => { this.myBlob = blob; });
    this.angularCropper.exportCanvas();
  }

  deleteImage() {
    this.imageUrl = null;
    this.resultImage = null;
    this.resultCroppedImg = null;
    this.myBlob = null;
    this.articleImg = null;
    this.imgName = null;
    this.imgGotAnImg = false;
    this.iGotCropped = false;
    this.IGotAnUrl = false;
  }

  resultImageFun(event: ImageCropperResult) {
    const urlCreator = window.URL;
    this.resultCroppedImg = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
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

    if (!this.articleImg) {

    } else {

      if (this.myBlob == null || this.iGotCropped === false) {
        uploadData.append('myFile', this.articleImg, this.articleImg.name);
      } else {
        console.log('iGotCropped: ', this.iGotCropped);
        uploadData.append('myFile', this.myBlob, this.articleImg.name);
      }
    }


    this.articlesService.addArticle(uploadData);

    // test si l'ajout a etait effectué
    this.router.navigate(['/articleList']);
  }

  onGetFiles(event: Event) {
    if ((event.target as HTMLInputElement).files[0].size > 1500000) {

      this.messageService.add({
        key: 'SizeTooBig', severity: 'error',
        summary: 'Wrong image', detail: 'Damn Mush your image is too big, its ok try again ', life: 5000
      });
      return;
    }

    if ((event.target as HTMLInputElement).files[0].type !== 'image/jpeg'
      && (event.target as HTMLInputElement).files[0].type !== 'image/jpg'
      && (event.target as HTMLInputElement).files[0].type !== 'image/png') {

      this.messageService.add({
        key: 'wrongExtension', severity: 'error',
        summary: 'Wrong image', detail: 'Damn Mush your image has not the good extension, its ok try again',
        life: 5000
      });
      return;
    }

    this.articleImg = (event.target as HTMLInputElement).files[0];
    this.imgName = (event.target as HTMLInputElement).files[0].name;
    this.imgGotAnImg = true;

    const reader = new FileReader();
    reader.readAsDataURL(this.articleImg);
    reader.onload = () => {
      if (this.angularCropper) {
        this.iGotCropped = false;
        this.imageUrl = reader.result;
        this.angularCropper.cropper.replace(this.imageUrl);
        this.angularCropper.cropper.destroy();
        this.angularCropper.cropper.clear();
      } else {
        this.iGotCropped = false;
        this.imageUrl = reader.result;
      }
      this.IGotAnUrl = true;
    };
  }
}
