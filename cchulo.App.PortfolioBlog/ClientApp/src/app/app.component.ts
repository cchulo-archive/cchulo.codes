import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { Unsubscribable } from 'rxjs';
import { EWindow, ETheme, ILink } from './core/shared/common';
import { NavService } from './core/services/nav.service';
import { fadeIn, fadeInOut, fadeAnimation, slideLeftRight } from './core/shared/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeIn,
    fadeInOut,
    fadeAnimation,
    slideLeftRight
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  links = this._navService.links;

  private _clientWindowSub: Unsubscribable;
  private _clientSettingSub: Unsubscribable;

  private readonly _darkThemeClass = 'dark-theme';
  
  isMobileSize = false;
  isDarkTheme = false;

  constructor(
    private _clientWindowService: ClientWindowService,
    private _clientSettingService: ClientSettingsService,
    private _element: ElementRef<HTMLElement>,
    private _navService: NavService) { }

  ngOnInit(): void {
    this._clientSettingSub = this._clientSettingService.theme
      .subscribe(theme => {
        
        if (theme == ETheme.dark) {
          this.isDarkTheme = true;
          this._element.nativeElement.classList.add(this._darkThemeClass);
        } else {
          this.isDarkTheme = false;
          this._element.nativeElement.classList.remove(this._darkThemeClass);
        }
      });

    this._clientWindowSub = this._clientWindowService.windowResizeEvent
      .subscribe(state => {
        if (state <= EWindow.md) {
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
      this._clientSettingService.setTheme(ETheme.light);
    } else {
      this._clientSettingService.setTheme(ETheme.dark);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['label'];
  }

  debug(event) {
    console.log(event);
  }
}