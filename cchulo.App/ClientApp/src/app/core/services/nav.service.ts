import { Injectable } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { ILink } from '../shared/common';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private _links: Array<ILink> = [];

  get links() : Readonly<ILink[]> {
    return this._links;
  }

  constructor() {

    for(let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
      const curr = routes[routeIndex];
      const link = curr.data as ILink;
      if (link === null || link == undefined) { continue; }
      const route = curr as Route;
      link.path = `/${route.path}`;
      this._links.push(link);
    }
  }

  
  
}
