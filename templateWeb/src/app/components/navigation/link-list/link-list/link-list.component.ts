import { Component, OnInit } from '@angular/core';
import { LISTLINKITEM } from '../../../../models/linkItems/linkItem';
@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  listLinkItem = LISTLINKITEM;

  constructor() { }

  ngOnInit() {
  }

}
