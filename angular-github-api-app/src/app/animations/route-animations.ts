import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* => forward', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
      }),
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%' }),  // Enter from left
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%' })),  // Exit to right
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' })),
      ], { optional: true })
    ]),
  ]),
  transition('* => backward', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
      }),
    ], { optional: true }),
    query(':enter', [
      style({ left: '100%' }),  // Enter from right
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '-100%' })),  // Exit to left
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' })),
      ], { optional: true })
    ]),
  ]),
]);
