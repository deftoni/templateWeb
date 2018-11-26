import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ArticleUpdateComponent} from '../../../articles/article-update-modal-content/article-update-modal-content.component';


@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './update-button.component.html'
})
export class UpdateButtonComponent {
  @Input() article;
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(ArticleUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.title = this.article.title;
    modalRef.componentInstance.content = this.article.content;
    modalRef.componentInstance.id = this.article.id;
    modalRef.componentInstance.img_irl = this.article.img_irl;
  }
}



