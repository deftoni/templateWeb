import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {
  itemSlideinTrigger,
  scrollAnimationFromRightTrigger,
  scrollAnimationFromLeftTrigger,
  scrollAnimationFromBottomTrigger } from './animation';
import { ServiceElement } from 'src/app/models/service-element/service-element.model';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
  animations: [ itemSlideinTrigger, scrollAnimationFromRightTrigger, scrollAnimationFromLeftTrigger, scrollAnimationFromBottomTrigger]
})
export class ServicesListComponent implements OnInit {

  public displayServiceElements: ServiceElement[] = [];
  public serviceElements: ServiceElement[];
  public state = 'hide';

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop - 300;

      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= componentPosition ) {
        this.state = 'show';
      } else {
        this.state = 'hide';
      }
    }

  ngOnInit() {
    this.serviceElements = [
      {
        id: '1',
        title: 'E-Commerce',
        // tslint:disable-next-line:max-line-length
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fa-shopping-cart'
      },
      {
        id: '2',
        title: 'Responsive Design',
        // tslint:disable-next-line:max-line-length
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fa-laptop'
      },
      {
        id: '3',
        title: 'Web Security',
        // tslint:disable-next-line:max-line-length
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fa-lock'
      }
    ];

    if (this.serviceElements.length >= 1) {
      this.displayServiceElements.push(this.serviceElements[0]);
    }
  }

  onItemAnimated(event: AnimationEvent, last: number) {
    if ( event.fromState !== 'void') {
      return;
    }
    if (this.serviceElements.length > last + 1 ) {
      this.displayServiceElements.push(this.serviceElements[last + 1 ]);
    } else {
      this.serviceElements = this.displayServiceElements;
    }
  }

}
