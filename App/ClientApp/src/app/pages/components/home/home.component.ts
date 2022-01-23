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
import { MediaLink } from 'src/models/media-link';
import { LinkService } from 'src/app/core/services/link.service';


interface ITileOrdering {
  label: string;
  order: number;
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
  links: Array<MediaLink> = [];

  orderTiles: Array<ITileOrdering> = [
    { label: 'greeting', order: 0 },
    { label: 'logo', order: 1 }
  ];

  private _clientSettingsSub: Unsubscribable;
  private _clientWindowSub: Unsubscribable;

  constructor(
    private _clientSettingsService: ClientSettingsService,
    private _clientWindowService: ClientWindowService,
    private _blogService: BlogService,
    private _linkService: LinkService
    ) { }

  async ngOnInit() {

    this.links = await this._linkService.getLinks();
    console.log(this.links);

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
