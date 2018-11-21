import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../../../services/articles/articles.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './article-update-modal-content.component.html',
  styleUrls: ['./article-update-modal-content.component.css']
})
export class NgbdModalContentComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Input() id;
  @Input() img_irl;

  ImgInputDisable: Boolean = true;
  myImgUrl;
  myImgName;
  constructor(public activeModal: NgbActiveModal, public articlesService: ArticlesService) { }

  ngOnInit() {
    this.myImgUrl = this.img_irl;
    this.myImgName = this.img_irl.substring(this.img_irl.lastIndexOf('/') + 1);
    console.log('coucou', this.img_irl.split('.', 1));
  }

  deleteArticleImage() {
    // this.articlesService.deleteArticleImage(this.id);
    this.ImgInputDisable = false;
    this.myImgName = 'choose... (png, jpeg, jpg)';
  }

  onUpdateArticle(form: NgForm) {

    if (form.invalid) {
      console.log('formulaire de modification d\'un article invalide');
      // test a faire
      return;
    }

    if (this.ImgInputDisable === true) {
      // this.articlesService.updateArticle(form.value);
    }
    console.log('Features in progess...');
    // this.articlesService.updateArticle(form.value);
  }
}
