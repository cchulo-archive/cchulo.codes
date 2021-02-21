import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { EWindow } from 'src/app/core/shared/common';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import * as _ from 'lodash-es';
import { BlogService } from 'src/app/core/services/blog.service';
import { Article } from 'src/models/article';

interface ITileOrdering {
  label: string;
  order: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isMobileSize = false;

  blogUpdates: Array<Article> = [];

  orderTiles: Array<ITileOrdering> = [
    { label: 'greeting', order: 0 },
    { label: 'logo', order: 1 }
  ];

  private _clientSettingsSub: Unsubscribable;
  private _clientWindowSub: Unsubscribable;

  constructor(
    private _clientSettingsService: ClientSettingsService,
    private _clientWindowService: ClientWindowService,
    private _blogService: BlogService
    ) { }

  async ngOnInit() {
    
    await this.getBlogUpdates();

    this._clientSettingsSub = this._clientSettingsService.theme.subscribe(theme => {
    });

    this._clientWindowSub = this._clientWindowService.windowResizeEvent.subscribe(state => {
      
      if (state <= EWindow.md) {
        this.isMobileSize = true;
      } else {
        this.isMobileSize = false;
      }
    });
  }

  ngOnDestroy() {

    if (this._clientSettingsSub) {
      this._clientSettingsSub.unsubscribe();
    }

    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }
  }

  async getBlogUpdates() {
    try {
      this.blogUpdates = await this._blogService.latestArticles();
      console.log(this.blogUpdates);
    } catch (err) {
      console.error(err);
      this.blogUpdates = [];
    }
  }

}
