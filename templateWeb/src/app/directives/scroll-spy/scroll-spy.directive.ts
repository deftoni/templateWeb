import { Directive, Output, ElementRef, HostListener } from '@angular/core';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
  @Output() public sectionChange = new EventEmitter();
  private currentFragment = window.location.hash;

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let currentFragment: string;
    const children = this.el.nativeElement.children;
    let scrollTop;
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      scrollTop = element.scrollTop;
          if (((element.offsetTop - window.pageYOffset) <= scrollTop) && (element.offsetTop + element.offsetHeight) > window.pageYOffset ) {
            currentFragment = element.id;
          }
    }
    if (currentFragment !== this.currentFragment) {
      console.log('changmeent a faire');
      this.currentFragment = currentFragment;
      if (this.currentFragment) {
        this.router.navigate(['/'], {fragment: this.currentFragment });
        // emit currentFragment
      }
    }
  }
}
