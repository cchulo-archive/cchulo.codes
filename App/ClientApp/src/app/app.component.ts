import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { Unsubscribable } from 'rxjs';
import { EWindow, ETheme, prepareRoute } from './core/shared/common';
import { NavService } from './core/services/nav.service';
import { routingFadeAnimation } from './core/shared/shared-animations';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

type TMode = 'determinate' | 'indeterminate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingFadeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {

  private _clientWindowSub: Unsubscribable;
  private _clientSettingSub: Unsubscribable;



  private readonly _darkThemeClass = 'dark-theme';

  links = this._navService.links;
  isMobileSize = false;
  isDarkTheme = true;
  prepareRoute = prepareRoute;

  mode: TMode = 'determinate';
  popupOpenSubscription: Unsubscribable;
  popupCloseSubscription: Unsubscribable;
  initializeSubscription: Unsubscribable;
  statusChangeSubscription: Unsubscribable;
  revokeChoiceSubscription: Unsubscribable;
  noCookieLawSubscription: Unsubscribable;

  constructor(
    private _clientWindowService: ClientWindowService,
    private _clientSettingService: ClientSettingsService,
    private _element: ElementRef<HTMLElement>,
    private _navService: NavService,
    private _ccService: NgcCookieConsentService
  ) {}

  ngOnInit(): void {
    
    if (!this._ccService.hasAnswered()) {
      this._ccService.open();
    }

    this._clientSettingSub = this._clientSettingService.theme
      .subscribe(theme => {
        if (theme === ETheme.dark || theme === undefined) {
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
    this._clientWindowSub?.unsubscribe();

    this._clientSettingSub?.unsubscribe();
  }



  toggleTheme(): void {
    if (this.isDarkTheme) {
      this._clientSettingService.setTheme(ETheme.light);
    } else {
      this._clientSettingService.setTheme(ETheme.dark);
    }
  }

}
