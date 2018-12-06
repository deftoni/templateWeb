import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
const query = (s, a, o= {optional: true}) => q(s, a, o);
export const routerTransition = trigger('routerTransition', [
  transition('* => article-details', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    sequence([
      query(':leave', animateChild()),
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('1200ms',
            style({ opacity: 1 }))
        ]),
        query(':leave', [
          style({ opacity: 1 }),
          animate('600ms',
            style({ opacity: 0 }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ])
]);
