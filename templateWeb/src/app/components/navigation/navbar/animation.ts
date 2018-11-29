import { trigger, state, style, transition, animate } from '@angular/animations';

export const scrollStateTrigger = trigger('scrollState', [
  state('onTop', style({
    backgroundColor: 'rgba(33, 37, 41, 0.4)'
  })),
  state('inPage', style({
    backgroundColor: 'rgba(33, 37, 41, 0.95)',
    padding: '14px',
  })),
  transition('onTop <=> inPage', animate('500ms 0ms ease-in'))
]);

// , animations: [ scrollStateTrigger ] + [@scrollState]="scrollInfo"
