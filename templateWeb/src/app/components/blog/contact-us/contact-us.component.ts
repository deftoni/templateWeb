import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailsService } from '../../../services/emails/emails.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  myformIsValid: Boolean = false;
  constructor(private emailService: EmailsService) { }

  ngOnInit() {

  }

  sendEmail (form: NgForm) {
    if (form.invalid) {
      console.log('form invalid');
      return;
    } else {
      this.myformIsValid = true;
    }
    console.log('appel du service a été commenté');
    // this.emailService.sendEmail(form.value);
  }

}
