import { Component, OnInit, Input } from '@angular/core';
import { ServiceElement } from 'src/app/models/service-element/service-element.model';

@Component({
  selector: 'app-service-element',
  templateUrl: './service-element.component.html',
  styleUrls: ['./service-element.component.css']
})
export class ServiceElementComponent implements OnInit {

  @Input() serviceElement: ServiceElement;
  constructor() { }

  ngOnInit() {
  }

}
