import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { Unsubscribable } from 'rxjs';
import { EWindow, ETheme } from './core/shared/common';

interface ILink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  links: Array<ILink> = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' }
  ]

  private _clientWindowSub: Unsubscribable;
  private _clientSettingSub: Unsubscribable;

  private readonly _darkThemeClass = 'dark-theme';
  
  isMobileSize = false;
  isDarkTheme = false;

  constructor(
    private clientWindowService: ClientWindowService,
    private clientSettingService: ClientSettingsService,
    private _element: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this._clientSettingSub = this.clientSettingService.theme
      .subscribe(theme => {
        if (theme === ETheme.dark) {
          this.isDarkTheme = true;
          this._element.nativeElement.classList.add(this._darkThemeClass);
        } else {
          this.isDarkTheme = false;
          this._element.nativeElement.classList.remove(this._darkThemeClass);
        }

        console.log(this.isDarkTheme);
      });

    this._clientWindowSub = this.clientWindowService.windowResizeEvent
      .subscribe(state => {
        if (state <= EWindow.sm) {
          this.isMobileSize = true;
        } else {
          this.isMobileSize = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }

    if (this._clientSettingSub) {
      this._clientSettingSub.unsubscribe();
    }
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      this.clientSettingService.setTheme(ETheme.light);
    } else {
      this.clientSettingService.setTheme(ETheme.dark);
    }
  }
}
