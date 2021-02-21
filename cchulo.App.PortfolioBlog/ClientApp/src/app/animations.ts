import { animate, animateChild, group, query, style, transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from "ng-animate";

export const fadeAnimation = 
trigger('routeAnimation', [
    transition('Home <=> Blog', [
        style({position: 'relative'}), // per the docs, the host view needs to be relative
        query(':enter, :leave', [ // child views need to be absolute
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })
        ]),
        query(':enter', [ // the new view that is entering should be invisible
            style({ opacity: 0 })
        ]),
        query(':leave', animateChild()), // play leave animations for view that is being removed
        group([
            query(':leave', useAnimation(fadeOut)), // fade out the view that is leaving
            query(':enter', useAnimation(fadeIn)) // fade in the new view
        ]),
        query(':enter', animateChild()) // play animations for the new view
    ])
  ]);
