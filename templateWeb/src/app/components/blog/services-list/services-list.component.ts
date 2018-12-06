import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { itemSlideinTrigger, scrollAnimationTrigger} from './animation';
import { ServiceElement } from 'src/app/models/service-element/service-element.model';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
  animations: [ itemSlideinTrigger, scrollAnimationTrigger]
})
export class ServicesListComponent implements OnInit {

  public serviceElements: ServiceElement[];
  public state = 'hide';

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop - 100;

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

  }


}
