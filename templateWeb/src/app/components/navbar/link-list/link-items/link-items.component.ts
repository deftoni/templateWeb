import { Component, OnInit, Input } from '@angular/core';
import { LinkItem } from '../../../../models/linkItems/linkItem';
@Component({
  selector: 'app-link-items',
  templateUrl: './link-items.component.html',
  styleUrls: ['./link-items.component.css']
})
export class LinkItemsComponent implements OnInit {

  @Input() linkItem: LinkItem;

  constructor() { }

  ngOnInit() {
  }

}
