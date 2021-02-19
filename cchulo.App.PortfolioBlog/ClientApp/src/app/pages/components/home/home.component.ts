import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { EWindow } from 'src/app/core/shared/common';
import { ClientWindowService } from 'src/app/core/services/client-window.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  isDarkMode = false;


  private _clientSettingsSub: Unsubscribable;
  private _clientWindowSub: Unsubscribable;

  constructor(
    private _clientSettingsService: ClientSettingsService,
    private _clientWindowService: ClientWindowService
    ) { }

  ngOnInit(): void {
    this._clientSettingsSub = this._clientSettingsService.theme.subscribe(theme => {
    });

    this._clientWindowSub = this._clientWindowService.windowResizeEvent.subscribe(state => {
      if (state <= EWindow.sm) {
        
      }
      else if (state === EWindow.md) {
        
      }
      else {
        
      }
    });
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {

    if (this._clientSettingsSub) {
      this._clientSettingsSub.unsubscribe();
    }

    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }
  }

}
