import { RouterOutlet } from '@angular/router';
import * as _ from 'lodash-es';

/**
 * This type will be used in client-window.service to
 * notify the UI what the current window width is
 */
export enum EWindow {
    xs = 0,
    sm = 1,
    md = 2,
    lg = 3,
    xl = 4
}

export enum ETheme {
    dark = 'dark',
    light = 'light'
}

export interface ILink {
    label: string;
    icon: string;
    path?: string;
}

export function getValuesFromStringEnum<T>(e: T): Array<string> {
    return _.filter(_.map(_.keys(e), key => e[key]), value => _.isString(value));
}

export function prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['label'];
}
