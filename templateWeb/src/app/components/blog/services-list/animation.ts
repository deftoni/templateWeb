import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const itemSlideinTrigger = trigger('itemSlidein', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(+100%)'
    }),
    animate('1000ms ease-out', keyframes([
      style({
        opacity: 0,
        transform: 'translateX(+100%)'
      }),
      style({
        opacity: 1,
        transform: 'translateX(-15%)'
      }),
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ]))
  ])
]);

export const scrollAnimationFromRightTrigger = trigger('scrollAnimationFromRight', [
  state('show', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('hide',   style({
    opacity: 0,
    transform: 'translateX(+100%)'
  })),
  transition('show => hide', animate('500ms ease-out')),
  transition('hide => show', animate('500ms ease-in'))
]);

export const scrollAnimationFromLeftTrigger = trigger('scrollAnimationFromLeft', [
  state('show', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('hide',   style({
    opacity: 0,
    transform: 'translateX(-100%)'
  })),
  transition('show => hide', animate('500ms ease-out')),
  transition('hide => show', animate('500ms ease-in'))
]);

export const scrollAnimationFromBottomTrigger = trigger('scrollAnimationFromBottom', [
  state('show', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('hide',   style({
    opacity: 0,
    transform: 'translateY(+100%)'
  })),
  transition('show => hide', animate('500ms ease-out')),
  transition('hide => show', animate('500ms ease-in'))
]);
