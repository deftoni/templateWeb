import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  title: String;
  lat: Number;
  lng: Number;
  constructor() { }

  ngOnInit() {
    this.title = 'My first AGM project';
    this.lat = 44.8637065;
    this.lng = -0.6561808;
  }

}
