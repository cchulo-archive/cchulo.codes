import { trigger, transition, style, animate, state, query, animateChild, group } from '@angular/animations';

export const slideRightLeft = trigger('slideRightLeft', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('10s ease-in', style({ transform: 'translateX(0%)' }))
    ])
]);

export const slideLeftRight = trigger('slideLeftRight', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('1s ease-in', style({ transform: 'translateX(-100%)' }))
    ])
]);

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in')
    ])
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in')
    ]),
    transition(':leave', [
        style({ opacity: 0 }),
        animate('600ms ease-out')
    ])
])
    ;

export const fadeAnimation = trigger('fadeAnimation', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%'
            })
        ], { optional: true }),
          // The query function has three params.
          // First is the event, so this will apply on entering or when the element is added to the DOM.
          // Second is a list of styles or animations to apply.
          // Third we add a config object with optional set to true, this is to signal
          // angular that the animation may not apply as it may or may not be in the DOM.
          query(':enter', [style({ opacity: 0 })], { optional: true }),
          query(':leave', animateChild(), { optional: true }),
          group([
            query(
                ':leave',
                // here we apply a style and use the animate function to apply the style over 0.3 seconds
                [style({ opacity: 1 }), animate('200ms ease-out', style({ opacity: 0 }))],
                { optional: true }
            ),
            query(
                ':enter',
                [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))],
                { optional: true }
            )
          ]),
          query(':enter', animateChild(), {optional: true})
    ])
]);
