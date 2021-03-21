import { trigger, transition, useAnimation, query, style, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { fadeIn, fadeInUp } from 'ng-animate';
import { BlogService } from 'src/app/core/services/blog.service';
import { Article } from 'src/models/article';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'app-blog-contents',
  templateUrl: './blog-contents.component.html',
  styleUrls: ['./blog-contents.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', useAnimation(fadeIn))
    ]),
    trigger('fadeInTags', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0}),
          stagger('50ms', [useAnimation(fadeIn)])
        ], {optional: true})
      ])
    ]),
    trigger('fadeInUpBlogs', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0}),
          stagger('50ms', [useAnimation(fadeInUp)])
        ], {optional: true}),
      ])
    ])
  ]
})
export class BlogContentsComponent implements OnInit {

  tags: Array<Tag> = [];
  articles: Array<Article> = [];
  articlesToShow: Array<Article> = [];

  filterTags: { [name: string]: boolean } = {};

  ready = false;

  constructor(private _blogService: BlogService) { }

  async ngOnInit() {

    try {
      this.tags = await this._blogService.tags();
      
      this.articles = await this._blogService.allArticles();
      this.articlesToShow = _.cloneDeep(this.articles);

      this.ready = true;
    } catch (err) {
      console.error(err);
    }
  }

  select(name: string) {
    console.log(`${name} clicked`);
    if (!name) { return; }
    if (!this.filterTags[name]) {
      this.filterTags[name] = true;
    } else {
      this.filterTags[name] = !this.filterTags[name];
    }

    this.articlesToShow = this.filterArticles();
  }

  filterArticles(): Array<Article> {

    // match article with selected tag(s)

    // if only one tag selected, article needs to have at least that one match

    if (!this.filterTags) {
      return this.articles;
    }
    
    const keys = _.keys(this.filterTags);
    
    if (keys.length === 0 || _.every(keys, key => this.filterTags[key] === false)) {
      return this.articles;
    }

    const filtered = _.filter(
      this.articles, article => _.some(
        article.tags, tag => !!this.filterTags[tag.name]));

    return filtered;
  }

}
