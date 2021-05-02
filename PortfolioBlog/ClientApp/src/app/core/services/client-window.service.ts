import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscribable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EWindow } from '../shared/common';

/** Simple interface to organize Breakpoint types with a EWindowEvent */
interface IBreakpointWindowPair {
  breakpoint: string,
  windowEvent: EWindow
}

/**
 * Service used to track changes in window of the application
 * 
 * If the user resizes the window, we want to notify components so they may adapt, and
 * therefore achieve a responsive application
 */
@Injectable({
  providedIn: 'root'
})
export class ClientWindowService {

  /** We initialize an array of IBreakpoints/windowEvent pairs */
  private readonly _eventPairs: Array<IBreakpointWindowPair> = [
    { breakpoint: Breakpoints.XSmall, windowEvent: EWindow.xs },
    { breakpoint: Breakpoints.Small, windowEvent: EWindow.sm },
    { breakpoint: Breakpoints.Medium, windowEvent: EWindow.md },
    { breakpoint: Breakpoints.Large, windowEvent: EWindow.lg },
    { breakpoint: Breakpoints.XLarge, windowEvent: EWindow.xl }
  ];

  /** We track the window size with a behavior subject, default value is EWindow.lg */
  private readonly _windowSize = new BehaviorSubject<EWindow>(EWindow.lg);

  /** public property so objects can subscribe to window change events */
  get windowResizeEvent (): Subscribable<EWindow> {
    return this._windowSize;
  }

  constructor(private _breakpointObserver: BreakpointObserver) {
    // we initialize subscriptions for all events
    // we do not need to track these subscriptions, since this is a top level service, and will be
    // garbage collected when the user navigates away from the page. We need these subscriptions for
    // the entire lifetime of the application however
    for(let index = 0; index < this._eventPairs.length; index++) {
      const eventPair = this._eventPairs[index];
      
      this._breakpointObserver.observe([eventPair.breakpoint]).subscribe(state => {
        if (state.matches) {
          this._windowSize.next(eventPair.windowEvent);
        }
      });
    }
  }
}
