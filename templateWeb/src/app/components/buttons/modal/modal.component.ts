import { Component, OnInit, Input } from '@angular/core';

import { ArticlesService } from '../../../services/articles/articles.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div class="modal-body">
    <div class="container">
    <h3>Création d'un article</h3>
    <form class="needs-validation" novalidate (ngSubmit)="onUpdateArticle(articleForm)" #articleForm="ngForm">
    <input type="hidden" name="id" ngModel ngModel='{{id}}'>
        <div class="form-group">
            <label for="articleTitle">Titre de l'article</label>
            <input type="text" class="form-control" name="title" placeholder="Entrer un titre" ngModel ngModel='{{title}}' required >
        </div>
      <div class="form-group">
        <label for="articleContent">Contenu de l'article</label>
        <textarea class="form-control" name="content" rows="4" ngModel ngModel='{{content}}' required></textarea>
      </div>
      <div class="modal-footer">
      <button type="submit"  class="btn btn-outline-dark" placement="top" ngbPopover="L'article a bien été modifié">Save</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
    </form>
  </div>
    </div>
  `
})
export class NgbdModalContentComponent {

  @Input() title;
  @Input() content;
  @Input() id;

  constructor(public activeModal: NgbActiveModal, public articlesService: ArticlesService) { }

  onUpdateArticle(form: NgForm) {
    console.log('poulouuu');
    if (form.invalid) {
      console.log('formulaire de modification d\'un article invalide');
      // test a faire
      return;
    }
    console.log(form.value);
    this.articlesService.updateArticle(form.value);
  }
}

@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './modal.component.html'
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



