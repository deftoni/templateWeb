import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ArticlesService } from '../../../services/articles/articles.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './article-update-modal-content.component.html',
  styleUrls: ['./article-update-modal-content.component.css']
})
export class NgbdModalContentComponent implements OnInit {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  @Input() title;
  @Input() content;
  @Input() id;
  @Input() img_irl;

  btnDeleteImgTrigged: Boolean = false ;
  articleImg: File = null;
  imgName: String = null;
  imgGotAnImg: Boolean = false;
  IGotAnUrl: Boolean = false;
  croppeOptions = [];
  resultCroppedImg: any;
  imageUrl = null;
  iGotCropped: Boolean = false;
  resultImage: any;
  myBlob;
  myImgIrl;
  myImgUrl;
  myImgName;

  constructor(public activeModal: NgbActiveModal, public articlesService: ArticlesService,
    public messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.myImgUrl = this.img_irl;
    this.myImgName = this.img_irl.substring(this.img_irl.lastIndexOf('/') + 1);
  }

  deleteArticleImage() {
    this.btnDeleteImgTrigged = true;
    this.myImgName = 'choose... (png, jpeg, jpg)';
  }

  onUpdateArticle(form: NgForm) {
    if (form.invalid) {
      // test a faire
      return;
    }
      const uploadData = new FormData();
      uploadData.append('id', form.value.id);
      uploadData.append('title', form.value.title);
      uploadData.append('content', form.value.content);
      uploadData.append('img_irl', form.value.img_irl);
      if (!this.articleImg) {
      } else {
        if (this.myBlob == null || this.iGotCropped === false) {
          uploadData.append('myFile', this.articleImg, this.articleImg.name);
        } else {
          uploadData.append('myFile', this.myBlob, this.articleImg.name);
        }
      }
    this.articlesService.updateArticle(uploadData);
    this.modalService.dismissAll();
  }

  onGetFiles(event) {

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

  CropMe() {
    this.iGotCropped = true;
    this.resultCroppedImg = this.angularCropper.imageUrl;
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas();
    this.resultImage.toBlob((blob) => { this.myBlob = blob; });
    this.angularCropper.exportCanvas();
  }

  resultImageFun(event: ImageCropperResult) {
    const urlCreator = window.URL;
    this.resultCroppedImg = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
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
}
