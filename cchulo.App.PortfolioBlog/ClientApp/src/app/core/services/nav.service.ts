import { Injectable } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { ILink } from '../shared/common';
import { Route, Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscribable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private _links: Array<ILink> = [];

  get links() : Readonly<ILink[]> {
    return this._links;
  }

  private _navSubj = new BehaviorSubject<boolean>(false);

  get navSubscription(): Subscribable<boolean> {
    return this._navSubj;
  }

  constructor(private _router: Router) {

    for(let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
      const curr = routes[routeIndex];
      const link = curr.data as ILink;
      if (link === null || link == undefined) { continue; }
      const route = curr as Route;
      link.path = `/${route.path}`;
      this._links.push(link);
    }

    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._navSubj.next(true);
      }
      else if (event instanceof NavigationEnd) {
        this._navSubj.next(false);
      }
    })
  }

  
  
}
