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
  imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Bartholdi_Fountain_in_Washington%2C_D.C._2012.JPG/800px-Bartholdi_Fountain_in_Washington%2C_D.C._2012.JPG';

  resultImage: any;
  resultResult: any;

  constructor(public articlesService: ArticlesService, private router: Router,
     private messageService: MessageService, private sanitizer: DomSanitizer) { }

  articleImg: File;
  imgName: String = null;
  imgGotAnImg: Boolean = false;
  imgPreview;
  iGotCropped: Boolean = false;
  myBlob;
  ngOnInit() {
  }

  CropMe() {
    this.iGotCropped = true;
    this.resultResult = this.angularCropper.imageUrl;
    console.log('Hello');
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas();
    this.resultImage.toBlob((blob) => {this.myBlob = blob; });
    console.log(this.resultImage);
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
    console.log('myFORMdATAtOSend: ', form.value.title);
    const uploadData = new FormData();

    uploadData.append('title', form.value.title);
    uploadData.append('content', form.value.content);
    uploadData.append('myFile', this.myBlob);

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

        // this.readURL(event.target);
        console.log('myURL: *******************', this.readURL(event.target));
        this.articleImg = (event.target as HTMLInputElement).files[0];
        console.log('myIMGIwantTheURL**************: ', this.articleImg);
        this.imgName = (event.target as HTMLInputElement).files[0].name;
        this.imgGotAnImg = true;

        // preview de l'image
        /*
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPreview = reader.result;
        };
        reader.readAsDataURL(this.articleImg);
        */
      }
    }
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        (document.getElementById('myImgInput') as HTMLImageElement).src = input.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

}
