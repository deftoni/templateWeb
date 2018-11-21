import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../../../services/articles/articles.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './article-update-modal-content.component.html'
})
export class NgbdModalContentComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Input() id;
  @Input() img_irl;

  constructor(public activeModal: NgbActiveModal, public articlesService: ArticlesService) { }

  ngOnInit() {
    console.log('coucou');
  }

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
