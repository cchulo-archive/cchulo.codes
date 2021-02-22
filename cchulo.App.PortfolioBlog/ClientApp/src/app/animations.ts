import { animateChild, group, query, style, transition, trigger, useAnimation } from "@angular/animations";
import { bounceIn, zoomOut } from "ng-animate";

let animation = [
    style({position: 'relative'}), // per the docs, the host view needs to be relative
    query(':enter, :leave', [ // child views need to be absolute
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
        })
    ], { optional: true }),
    query(':enter', [ // the new view that is entering should be invisible
        style({ opacity: 0 })
    ]),
    query(':leave', animateChild(), { optional: true }), // play leave animations for view that is being removed
    group([
        query(':leave', useAnimation(zoomOut), { optional: true }), // fade out the view that is leaving
        query(':enter', useAnimation(bounceIn)) // fade in the new view
    ]),
    query(':enter', animateChild()) // play animations for the new view
];

export const fadeAnimation = 
trigger('routeAnimation', [
    transition('Home <=> *', animation),
    transition('Blog <=> *', animation),
    transition('Projects <=> *', animation),
    transition('Abount <=> *', animation),
    transition('Contact <=> *', animation),
]);
