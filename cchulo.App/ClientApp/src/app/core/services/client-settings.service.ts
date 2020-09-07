import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscribable } from 'rxjs';
import { ETheme } from '../shared/common';

/**
 * This service is responsible for remembering settings from the user to be used
 * in other components in the application.
 * 
 * For example: dark theme
 * 
 * If the user sets dark theme, then this should set appropriate color scheme not just for Angular
 * Material, but also some other components that may or may not support Angular Material,
 * and should have their color changed in some other way
 */
@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {

  /** We initialize theme to be light */
  private _theme = new BehaviorSubject<ETheme>(ETheme.light);

  /** public property used to subscribe to changes in theme */
  get theme(): Subscribable<ETheme> {
    return this._theme;
  }

  /** keyword to be used to store the theme in the localStorage */
  private readonly _themeStore = '__cchulo_theme__';

  constructor(private _swUpdate: SwUpdate) {

    this.setTheme((<ETheme>localStorage[this._themeStore]));

    // TODO:
    // may need to move this to the app.component directly
    // it may be redundant to keep this here
    if (this._swUpdate.isEnabled) {
      this._swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  /**
   * Function used to set the theme for the application
   * @param theme the color theme, if undefined or null then theme is set to light
   */
  setTheme(theme: ETheme) {
    console.log(theme);
    if (theme === null || theme === undefined) {
      localStorage[this._themeStore] = ETheme.light;
    } else {
      localStorage[this._themeStore] = theme;
    }

    this._theme.next(theme);
  }
}
