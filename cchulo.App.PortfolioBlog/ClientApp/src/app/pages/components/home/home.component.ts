import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { EWindow } from 'src/app/core/shared/common';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import * as _ from 'lodash-es';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogPost } from 'src/models/blog-post';
import { zoomIn } from 'ng-animate'
import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface ITileOrdering {
  label: string;
  order: number;
}

interface IMediaLink {
  url: string;
  faIcon: IconName
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0 }),
          stagger('50ms', [useAnimation(zoomIn)])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  isMobileSize = false;
  isReady = false;

  screenCheckComplete = false;
  blogEntriesComplete = false;

  blogUpdates: Array<BlogPost> = [];

  orderTiles: Array<ITileOrdering> = [
    { label: 'greeting', order: 0 },
    { label: 'logo', order: 1 }
  ];

  links: Array<IMediaLink> = [
    { url: 'https://www.linkedin.com/in/carlos-chulo-150753b6/', faIcon: 'linkedin' },
    { url: 'https://github.com/cchulo', faIcon: 'github' },
    { url: 'https://www.instagram.com/cchulo.codes/', faIcon: 'instagram' },
  ];

  private _clientSettingsSub: Unsubscribable;
  private _clientWindowSub: Unsubscribable;

  constructor(
    private _clientSettingsService: ClientSettingsService,
    private _clientWindowService: ClientWindowService,
    private _blogService: BlogService
    ) { }

  async ngOnInit() {

    this._clientSettingsSub = this._clientSettingsService.theme.subscribe(theme => {
    });

    this._clientWindowSub = this._clientWindowService.windowResizeEvent.subscribe(state => {
      
      if (state <= EWindow.md) {
        this.isMobileSize = true;
      } else {
        this.isMobileSize = false;
      }

      this.screenCheckComplete = true;
    });

    try {
      await this._getBlogUpdates();
      this.blogEntriesComplete = true;
    } catch (err) {
      console.error(err);
    }
  }

  ngAfterContentInit() {
    this.isReady = true;
  }

  ngOnDestroy() {

    if (this._clientSettingsSub) {
      this._clientSettingsSub.unsubscribe();
    }

    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }
  }

  private async _getBlogUpdates() {
    try {
      this.blogUpdates = await this._blogService.latestBlogPosts();
    } catch (err) {
      console.error(err);
      this.blogUpdates = null;
    }
  }

}
