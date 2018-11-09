import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContentComponent} from '../../articles/article-update-modal-content/article-update-modal-content.component';


@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './update-button.component.html'
})
export class NgbdModalComponent {
  @Input() article;
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.title = this.article.title;
    modalRef.componentInstance.content = this.article.content;
    modalRef.componentInstance.id = this.article.id;
  }
}


