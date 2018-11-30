import { Directive, Output, ElementRef, HostListener, Input } from '@angular/core';
import { EventEmitter } from 'events';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
  @Input() public spiedTags = [];
  @Output() public sectionChange = new EventEmitter();
  private currentFragment: string;

  constructor(private el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log('mon event', event);
    let currentFragment: string;
    const children = this.el.nativeElement.children;
    console.log('children', children);
    const scrollTop = event.target.scrollTop;
    const parentOffset = event.target.offsetTop;
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
          if ((element.offsetTop - parentOffset) <= scrollTop) {
            currentFragment = element.id;
          }
      }
    }
    if (currentFragment !== this.currentFragment) {
      this.currentFragment = currentFragment;
      this.sectionChange.emit(this.currentFragment);
    }
  }
}
