import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSmoothScroll]'
})
export class SmoothScrollDirective implements AfterViewInit, OnDestroy {

  private routeFragmentSub: Subscription;
  constructor(private el: ElementRef, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.routeFragmentSub = this.route.fragment.subscribe((fragment: string) => {
      if (fragment && this.el.nativeElement && this.el.nativeElement.id === fragment) {
        this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
        // document.querySelector('#' + fragment).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    });
  }

  ngOnDestroy() {
    this.routeFragmentSub.unsubscribe();
  }
}
