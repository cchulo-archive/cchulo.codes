import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogPost } from 'src/models/blog-post';
import { MarkdownService } from 'ngx-markdown';
import { fadeIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';
import { saveAs } from 'file-saver';
import * as _ from 'lodash-es';
import { FileSavingService } from 'src/app/core/services/file-saving.service';

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

  post: BlogPost;

  busy = false;

  constructor(
    private _route: ActivatedRoute,
    private _blogService: BlogService,
    private _markdownService: MarkdownService,
    private _fileSavingService: FileSavingService) { }

  ngOnInit(): void {

    this._markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `<img class="img-helper" src="${href}" alt="${text}" />`;
    }
    this.paramSub = this._route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        this.post = await this._blogService.fullBlogPost(Number.parseInt(id));
        this.ready = true;
      } catch (err) {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
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

}
