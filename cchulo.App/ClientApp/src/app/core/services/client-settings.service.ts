import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscribable } from 'rxjs';
import { ETheme } from '../shared/common';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {

  private _theme = new BehaviorSubject<ETheme>(ETheme.light);

  get theme(): Subscribable<ETheme> {
    return this._theme;
  }

  private readonly _themeStore = '__cchulo_theme__';

  constructor(private swUpdate: SwUpdate) {

    this.setTheme(localStorage[this._themeStore]);

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  setTheme(theme: ETheme) {
    if (theme === null || theme === undefined) {
      localStorage[this._themeStore] = ETheme.light;
    } else {
      localStorage[this._themeStore] = theme;
    }

    this._theme.next(theme);
  }
}
