import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Subscribable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EWindow } from '../shared/common';

interface IBreakpointWindowPair {
  breakpoint: string,
  windowEvent: EWindow
}

@Injectable({
  providedIn: 'root'
})
export class ClientWindowService {

  private readonly _eventPairs: Array<IBreakpointWindowPair> = [
    { breakpoint: Breakpoints.XSmall, windowEvent: EWindow.xs },
    { breakpoint: Breakpoints.Small, windowEvent: EWindow.sm },
    { breakpoint: Breakpoints.Medium, windowEvent: EWindow.md },
    { breakpoint: Breakpoints.Large, windowEvent: EWindow.lg },
    { breakpoint: Breakpoints.XLarge, windowEvent: EWindow.xl }
  ];

  private readonly _windowSize = new BehaviorSubject<EWindow>(EWindow.lg);

  get windowResizeEvent (): Subscribable<EWindow> {
    return this._windowSize;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    for(let index = 0; index < this._eventPairs.length; index++) {
      const eventPair = this._eventPairs[index];
      
      this.breakpointObserver.observe([eventPair.breakpoint]).subscribe(state => {
        if (state.matches) {
          this._windowSize.next(eventPair.windowEvent);
        }
      });
    }
  }
}
