import { trigger, transition, style, animate, state } from '@angular/animations';

export const slideRightLeft = trigger('slideRightLeft', [
    transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
    ])
]);

export const slideLeftRight = trigger('slideLeftRight', [
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
    ])
]);

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in')
    ])
]);
