import { Component, OnInit, inject, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
  @Input() error;

  message = 'An unknown error';

  constructor() { }

  ngOnInit() {
    this.message = this.error.error.error;
  }

}
