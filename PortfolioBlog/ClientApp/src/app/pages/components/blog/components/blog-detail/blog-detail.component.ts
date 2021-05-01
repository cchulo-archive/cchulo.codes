import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer, Unsubscribable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogPost } from 'src/models/blog-post';
import { MarkdownService } from 'ngx-markdown';
import { fadeIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';
import { saveAs } from 'file-saver';
import * as _ from 'lodash-es';
import { FileSavingService } from 'src/app/core/services/file-saving.service';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  animations: [
    trigger('fadeInBanner', [
      transition(':enter', useAnimation(fadeIn))
    ]),
    trigger('fadeInContent', [
      transition(':enter', useAnimation(fadeIn))
    ])
  ]
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  ready = false;

  paramSub: Unsubscribable;
  ccSub: Unsubscribable;

  post: BlogPost;

  busy = false;

  constructor(
    private _route: ActivatedRoute,
    private _blogService: BlogService,
    private _markdownService: MarkdownService,
    private _fileSavingService: FileSavingService,
    private _ccService: NgcCookieConsentService) { }

  ngOnInit(): void {

    

    this._markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `<img class="img-helper" src="${href}" alt="${text}" />`;
    };

    this._markdownService.renderer.html = (html: string) => {
      if (!this._ccService.hasConsented()) {
        return `
        <div style="width: 100%; border-color: red; border-style: solid; height: 315px; display: flex; justify-content: center;">
          <h3 class="mat-h3" style="align-self: center">Third party iframes disabled until you accept cookies (if accepted you may need to refresh the page)</h3>
        </div>
        `;
      }

      return html;
    };

    this.paramSub = this._route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        this.post = await this._blogService.fullBlogPost(Number.parseInt(id));
        this.ready = true;
        this.initCCCheck();
      } catch (err) {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.ccSub?.unsubscribe();
  }

  async downloadFile(url: string) {
    const filename = _.last(url.split('/'));
    this.busy = true;
    const blob = await this._fileSavingService.download(url);
    if (blob != null) {
      saveAs(blob, filename);
    }
    this.busy = false;
  }

  initCCCheck() {
    this.ccSub = this._ccService.statusChange$.subscribe(() => {
      this.ready = false;
      timer(5000).pipe(take(1)).subscribe(() => this.ready = true);
    });
  }

}

