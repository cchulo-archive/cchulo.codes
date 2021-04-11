import { animateChild, group, query, style, transition, trigger, useAnimation } from "@angular/animations";
import { bounceIn, zoomOut } from "ng-animate";
import * as _ from 'lodash-es';
import { ERouteLabels } from "./e-route-labels";
import { getValuesFromStringEnum } from "./common";

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
    ], {optional: true}),
    query(':leave', query('@*', animateChild(), { optional: true }), { optional: true }), // play leave animations for view that is being removed
    group([
        query(':leave', useAnimation(zoomOut), { optional: true }), // fade out the view that is leaving
        query(':enter', useAnimation(bounceIn), { optional: true}) // fade in the new view
    ]),
    query(':enter', query('@*', animateChild(), { optional: true }), {optional: true}) // play animations for the new view
];

const constructFadeAnimation = (details: Array<string>) => {
    return trigger('routeAnimation', _.map(details, str => transition(`${str} <=> *`, animation)))
}

export const routingFadeAnimation = constructFadeAnimation(getValuesFromStringEnum(ERouteLabels));
