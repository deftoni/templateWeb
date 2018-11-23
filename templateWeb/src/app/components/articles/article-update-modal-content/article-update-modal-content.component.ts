import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ArticlesService } from '../../../services/articles/articles.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';
import { Config } from './../../../config/config';

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

  private config = new Config();
  btnDeleteImgTrigged: Boolean = false ;
  myImgUrl;
  myImgName;
  articleImg: File;
  imgName: String = null;
  imgGotAnImg: Boolean = false;
  theDefaultImg = this.config.getDefaultArticleImgUrl;

  constructor(public activeModal: NgbActiveModal, public articlesService: ArticlesService, public messageService: MessageService) { }

  ngOnInit() {
    console.log('my input disable: ', this.btnDeleteImgTrigged);
    this.myImgUrl = this.img_irl;
    this.myImgName = this.img_irl.substring(this.img_irl.lastIndexOf('/') + 1);
    console.log('coucou', this.img_irl.split('.', 1));
  }

  deleteArticleImage(form: NgForm) {
    // this.articlesService.deleteArticleImage(this.id);
    this.btnDeleteImgTrigged = true;
    this.myImgName = 'choose... (png, jpeg, jpg)';
    this.articlesService.updateArticle(form.value);
    console.log('input disable booleen: ', this.btnDeleteImgTrigged);
  }

  onUpdateArticle(form: NgForm) {

    if (form.invalid) {
      console.log('formulaire de modification d\'un article invalide');
      // test a faire
      return;
    }

    if (this.btnDeleteImgTrigged === false) {

      this.btnDeleteImgTrigged = true;
      this.myImgName = 'choose... (png, jpeg, jpg)';
      this.articlesService.updateArticle(form.value);
      console.log('input disable booleen: ', this.btnDeleteImgTrigged);
      console.log('my form trigge false: ', form.value);

    } else {
      console.log('my form trigge true: ', form.value);
    }
    console.log('Features in progess...');
    // this.articlesService.updateArticle(form.value);
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
  }
}
