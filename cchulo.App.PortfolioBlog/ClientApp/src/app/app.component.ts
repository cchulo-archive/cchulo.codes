import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { Unsubscribable } from 'rxjs';
import { EWindow, ETheme, prepareRoute } from './core/shared/common';
import { NavService } from './core/services/nav.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { routingFadeAnimation } from './core/shared/shared-animations';

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

  private readonly _svgIcons: Array<string> = [
    'logo-styled',
    'logo-styled-gradient'
  ];

  private readonly _darkThemeClass = 'dark-theme';
  private readonly _lightThemeClass = 'light-theme';
  
  links = this._navService.links;
  isMobileSize = false;
  isDarkTheme = false;
  prepareRoute = prepareRoute;

  mode: TMode = 'determinate';

  constructor(
    private _clientWindowService: ClientWindowService,
    private _clientSettingService: ClientSettingsService,
    private _element: ElementRef<HTMLElement>,
    private _navService: NavService,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    
    this.initIcons();

    this._clientSettingSub = this._clientSettingService.theme
      .subscribe(theme => {
        
        if (theme == ETheme.dark) {
          this.isDarkTheme = true;
          this._element.nativeElement.classList.remove(this._lightThemeClass);
          this._element.nativeElement.classList.add(this._darkThemeClass);
        } else {
          this.isDarkTheme = false;
          this._element.nativeElement.classList.remove(this._darkThemeClass);
          this._element.nativeElement.classList.add(this._lightThemeClass);
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

  private initIcons(): void {
    for (let index = 0; index < this._svgIcons.length; index++) {
      const name = this._svgIcons[index];
      if (!name) { continue; }
      const sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-icons/${name}.svg`);
      this._iconRegistry.addSvgIcon(name, sanitizedUrl);
    }
  }

  toggleTheme(): void {
    if (this.isDarkTheme) {
      this._clientSettingService.setTheme(ETheme.light);
    } else {
      this._clientSettingService.setTheme(ETheme.dark);
    }
  }
}
